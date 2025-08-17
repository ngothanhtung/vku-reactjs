import React, { useRef, useState } from 'react';
import API from './api';

// Types and interfaces
interface ChunkInfo {
  index: number;
  blob: Blob;
  start: number;
  end: number;
}

interface SliceResult {
  chunks: ChunkInfo[];
  totalChunks: number;
}

interface UploadProgress {
  uploadedBytes: number;
  totalBytes: number;
  percent: number;
}

interface HashProgress {
  isCalculating: boolean;
  currentStep: string;
  fileHash?: string;
  chunksHashed: number;
  totalChunks: number;
  expectedHash?: string;
  hashMatch?: boolean;
}

interface AbortRef {
  aborted: boolean;
}

interface InitResponse {
  uploadId: string;
  chunkSize?: number;
}

interface StatusResponse {
  chunks?: number[];
}

// chunkSize: ví dụ 5 * 1024 * 1024 (5MB)
function sliceIntoChunks(file: File, chunkSize: number): SliceResult {
  const totalChunks = Math.ceil(file.size / chunkSize);
  const chunks: ChunkInfo[] = [];
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const blob = file.slice(start, end);
    chunks.push({ index: i, blob, start, end });
  }
  return { chunks, totalChunks };
}

// Dùng để tính SHA-256 hash của Blob
// (có thể dùng để xác thực file sau khi upload)
// Chú ý: hàm này có thể tốn thời gian nếu file lớn, nên
// có thể cần hiển thị progress cho người dùng
async function sha256OfBlob(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Calculate hash for individual chunks with progress
async function calculateChunksHash(
  chunks: ChunkInfo[],
  onProgress: (progress: { current: number; total: number; step: string }) => void
): Promise<Map<number, string>> {
  const chunkHashes = new Map<number, string>();

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    onProgress({
      current: i + 1,
      total: chunks.length,
      step: `Hashing chunk ${i + 1}/${chunks.length}`,
    });

    const hash = await sha256OfBlob(chunk.blob);
    chunkHashes.set(chunk.index, hash);
    console.log(`Chunk ${i + 1}/${chunks.length} hash: ${hash.substring(0, 16)}...`);
  }

  return chunkHashes;
}

export default function ChunkUploadExample(): React.JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<UploadProgress>({ uploadedBytes: 0, totalBytes: 0, percent: 0 });
  const [hashProgress, setHashProgress] = useState<HashProgress>({
    isCalculating: false,
    currentStep: '',
    chunksHashed: 0,
    totalChunks: 0,
  });
  const [statusText, setStatusText] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const abortRef = useRef<AbortRef>({ aborted: false });

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  const CONCURRENCY = 4; // 4 chunk song song

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const f = e.target.files?.[0];
    setFile(f || null);
    setProgress({ uploadedBytes: 0, totalBytes: f ? f.size : 0, percent: 0 });
    setStatusText('');
    setUploadId(null); // Reset upload session when new file is selected

    // Calculate file hash when file is selected and log to console
    if (f) {
      calculateFileHash(f);
      console.log(`File selected: ${f.name}, Size: ${(f.size / 1024 / 1024).toFixed(2)} MB`);
    } else {
      setHashProgress({
        isCalculating: false,
        currentStep: '',
        chunksHashed: 0,
        totalChunks: 0,
      });
    }
  }

  async function calculateFileHash(selectedFile: File): Promise<void> {
    setHashProgress({
      isCalculating: true,
      currentStep: 'Calculating file hash...',
      chunksHashed: 0,
      totalChunks: 0,
    });

    try {
      const hash = await sha256OfBlob(selectedFile);

      setHashProgress({
        isCalculating: false,
        currentStep: 'File hash calculated',
        fileHash: hash,
        chunksHashed: 0,
        totalChunks: 0,
      });

      console.log(`File hash calculated: ${hash}`);
    } catch (error) {
      setHashProgress({
        isCalculating: false,
        currentStep: 'Error calculating hash',
        chunksHashed: 0,
        totalChunks: 0,
      });
      console.error('Error calculating file hash:', error);
    }
  }

  function abortUpload(): void {
    abortRef.current.aborted = true;
    setStatusText('Đã dừng upload.');
    setIsUploading(false);
  }

  async function copyHashToClipboard(): Promise<void> {
    if (hashProgress.fileHash) {
      try {
        await navigator.clipboard.writeText(hashProgress.fileHash);
        setStatusText('Hash copied to clipboard!');
        console.log('Hash copied to clipboard:', hashProgress.fileHash);
      } catch (error) {
        console.error('Failed to copy hash:', error);
        setStatusText('Failed to copy hash to clipboard');
      }
    }
  }

  async function upload(): Promise<void> {
    if (!file) return;
    abortRef.current.aborted = false;
    setIsUploading(true);
    setStatusText('Khởi tạo phiên upload…');

    // 1) Cắt chunks
    const { chunks, totalChunks } = sliceIntoChunks(file, CHUNK_SIZE);

    console.log(`Tổng số chunks: ${totalChunks}, mỗi chunk: ${CHUNK_SIZE / 1024 / 1024} MB`);

    // Use existing file hash if available, otherwise calculate it
    let fileHash = hashProgress.fileHash;
    if (!fileHash) {
      setStatusText('Calculating file hash...');
      fileHash = await sha256OfBlob(file);
      setHashProgress((prev) => ({ ...prev, fileHash }));
    }

    // Calculate chunk hashes for validation
    setStatusText('Calculating chunk hashes...');
    setHashProgress((prev) => ({ ...prev, isCalculating: true, totalChunks }));

    const chunkHashes = await calculateChunksHash(chunks, (progress) => {
      setHashProgress((prev) => ({
        ...prev,
        chunksHashed: progress.current,
        currentStep: progress.step,
      }));
    });

    setHashProgress((prev) => ({ ...prev, isCalculating: false }));

    // 2) Sử dụng upload session hiện có hoặc tạo mới
    let realUploadId = uploadId;
    if (!realUploadId) {
      setStatusText('Tạo phiên upload mới...');
      const initResp: InitResponse = await API.init(file.name, totalChunks, file.size, fileHash);
      realUploadId = initResp.uploadId;
      setUploadId(realUploadId);
      console.log(`Upload session created with ID: ${realUploadId}`);
    } else {
      setStatusText('Tiếp tục phiên upload hiện có...');
      console.log(`Resuming existing upload session: ${realUploadId}`);
    }

    // 3) Resume: hỏi server có những chunk nào
    const st: StatusResponse = await API.status(realUploadId);
    const have = new Set(st.chunks || []);
    const todo = chunks.filter((c) => !have.has(c.index));

    console.log(`📋 Upload status check:`);
    console.log(`   - Total chunks: ${totalChunks}`);
    console.log(
      `   - Chunks on server: ${have.size} (${Array.from(have)
        .sort((a, b) => a - b)
        .join(', ')})`
    );
    console.log(
      `   - Chunks to upload: ${todo.length} (${todo
        .map((c) => c.index)
        .sort((a, b) => a - b)
        .join(', ')})`
    );

    if (have.size > 0) {
      setStatusText(`📊 Resume detected: ${have.size}/${totalChunks} chunks already on server`);
    }

    // 4) Tính tổng bytes đã có (resume progress)
    let uploadedBytes = 0;
    for (const c of chunks) {
      if (have.has(c.index)) uploadedBytes += c.end - c.start;
    }
    setProgress({
      uploadedBytes,
      totalBytes: file.size,
      percent: Math.round((uploadedBytes / file.size) * 100),
    });

    setStatusText(`Bắt đầu upload ${todo.length}/${chunks.length} chunks… (song song ${CONCURRENCY})`);

    // 5) Hàm queue upload theo concurrency
    let cursor = 0;
    let uploadedChunksCount = 0;
    const workers: Promise<void>[] = [];

    async function worker(): Promise<void> {
      while (cursor < todo.length && !abortRef.current.aborted) {
        const job = todo[cursor++];

        // Get the pre-calculated chunk hash
        const chunkHash = chunkHashes.get(job.index);

        console.log(
          `📤 Uploading chunk ${job.index}/${totalChunks} (${uploadedChunksCount + 1}/${todo.length} in this session) - Hash: ${chunkHash?.substring(0, 8)}...`
        );

        await API.uploadChunk({
          uploadId: realUploadId!,
          chunkIndex: job.index,
          totalChunks,
          filename: file!.name,
          blob: job.blob,
          chunkHash,
        });

        uploadedChunksCount++;
        uploadedBytes += job.end - job.start;
        setProgress(() => {
          const percent = Math.round((uploadedBytes / file!.size) * 100);
          return { uploadedBytes, totalBytes: file!.size, percent };
        });

        console.log(`✅ Chunk ${job.index} uploaded successfully (${uploadedChunksCount}/${todo.length} chunks in this session)`);
      }
    }

    for (let i = 0; i < CONCURRENCY; i++) workers.push(worker());

    try {
      await Promise.all(workers);
    } catch (error) {
      console.error('Upload failed:', error);
      setStatusText(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsUploading(false);
      return;
    }

    if (abortRef.current.aborted) {
      setIsUploading(false);
      return;
    }

    setStatusText('Hoàn tất chunks. Gọi /complete…');
    const done = await API.complete(realUploadId!, file!.name, fileHash!);

    // Verify file hash integrity
    console.log(`🎉 Upload completed successfully!`);
    console.log(`📊 Final statistics:`);
    console.log(`   - File: ${file.name}`);
    console.log(`   - Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   - Total chunks: ${totalChunks}`);
    console.log(`   - File hash: ${fileHash}`);
    console.log(`   - Server response:`, done);

    setStatusText('✅ Upload completed!');
    setIsUploading(false);
    setUploadId(null); // Reset upload session after completion
  }

  return (
    <div style={{ maxWidth: 520, fontFamily: 'system-ui, sans-serif' }}>
      <h3>Upload theo chunks (React)</h3>
      <input type="file" onChange={onFileChange} />
      <div style={{ marginTop: 12 }}>
        <button onClick={upload} disabled={!file || isUploading}>
          {uploadId ? 'Resume Upload' : 'Start Upload'}
        </button>
        <button onClick={abortUpload} disabled={!isUploading} style={{ marginLeft: 8 }}>
          Stop
        </button>
        {hashProgress.fileHash && (
          <button onClick={copyHashToClipboard} style={{ marginLeft: 8 }}>
            Copy Hash
          </button>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <div>File: {file ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : '—'}</div>
        {uploadId && <div style={{ marginTop: 4, fontSize: '12px', color: '#666' }}>Upload Session: {uploadId.substring(0, 8)}... (ready to resume)</div>}

        {/* Simple Hash Display */}
        {hashProgress.fileHash && (
          <div style={{ marginTop: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
            <div style={{ fontSize: '12px', color: '#666' }}>File Hash:</div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#333', wordBreak: 'break-all' }}>{hashProgress.fileHash}</div>
          </div>
        )}

        {/* Upload Progress Bar */}
        <div style={{ marginTop: 16, height: 8, background: '#eee', borderRadius: 4 }}>
          <div
            style={{
              width: `${progress.percent}%`,
              height: '100%',
              background: '#4caf50',
              borderRadius: 4,
              transition: 'width 0.2s',
            }}
          />
        </div>
        <div style={{ marginTop: 6 }}>
          {progress.percent}% ({(progress.uploadedBytes / 1024 / 1024).toFixed(2)} / {(progress.totalBytes / 1024 / 1024).toFixed(2)} MB)
        </div>
        <div style={{ marginTop: 8, color: '#555' }}>{statusText}</div>
      </div>
    </div>
  );
}

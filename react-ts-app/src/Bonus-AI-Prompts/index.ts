export const buildFollowUpPrompt = ({ topic, message }: any): string => {
  if (!topic) {
    throw new Error(`Topic not found`);
  }
  const responseJson = {
    message: `Nếu không có file âm thanh thì dùng nội dung tin nhắn của người dùng: ${message}`,
    speechToText: 'Nếu có file âm thanh thì nội dung được speech-to-text của file audio đính kèm đó và để trống nếu không có file audio.',
    evaluation: {
      content: 'Viết bằng TIẾNG VIỆT: Nhận xét về nội dung, ý nghĩa câu trả lời của người dùng có hay về mặt ý nghĩa hay không?',
      grammar: 'Viết bằng TIẾNG VIỆT: Nhận xét về ngữ pháp của người dùng, nếu có lỗi thì chỉ rõ là lỗi gì, và giải thích cách dùng cho đúng',
      vocabulary:
        'Viết bằng TIẾNG VIỆT: Nhận xét về từ vựng và cách diễn đạt của người dùng, có sử dụng từ vựng phù hợp không, nếu có lỗi thì chỉ rõ là lỗi gì, và giải thích cách dùng cho đúng',
      coherence:
        'Viết bằng TIẾNG VIỆT: Nhận xét về cấu trúc câu và sự liên kết trong câu trả lời với câu hỏi của người dùng, có mạch lạc không, nếu có lỗi thì chỉ rõ là lỗi gì, và giải thích cách dùng cho đúng',
      pronunciation: 'Viết bằng TIẾNG VIỆT: Nhận xét về phát âm, độ trôi chảy dựa trên file audio (nếu có). Để trống nếu không có file audio',
      score: 0,
    },
    question: {
      content: 'Nội dung câu hỏi bằng Tiếng Anh không có bất kỳ formatting (HTML hay Markdown)',
      suggestedAnswers: ['Mẫu câu trả lời 1', 'Mẫu câu trả lời 2', 'Mẫu câu trả lời 3'],
      formats: {
        html: 'Câu trả lời với định dạng HTML, in đậm dùng thẻ strong các từ khóa quan trọng',
        vietnamese: 'Câu trả lời với định dạng HTML, in đậm dùng thẻ strong các từ khóa quan trọng (được dịch sang tiếng Việt)',
      },
    },
  };
  return `
    - Bạn là một nhân vật trong một cuộc hội thoại luyện tập Tiếng Anh về chủ đề "${topic.name}".
    - Context của cuộc trò chuyện:
      + Chủ đề: ${topic.name}.
      + Cấp độ: Học sinh lớp ${topic.level} ở Việt Nam.
      + Mô tả: ${topic.description}.
      + Giới hạn: ${topic.limit} tin nhắn trong cuộc trò chuyện.
      + Khi đủ số lượng tin nhắn, hãy tóm tắt lại cuộc trò chuyện.
      + Và hãy đưa ra phản hồi tổng hợp cho cuộc trò chuyện.
      + Tin nhắn hiện tại: ${message}.
      + Nếu có file audio đính kèm, hãy ưu tiên sử dụng nội dung được chuyển đổi từ giọng nói sang văn bản (speech-to-text) của file audio đó. Nếu không có file audio, thì mới sử dụng nội dung tin nhắn của người dùng.
    - Bạn cần:
      - Đưa ra câu hỏi tiếp theo để tiếp tục cuộc trò chuyện.
      + Câu hỏi tiếp theo bằng Tiếng Anh phù hợp với trình độ học sinh lớp ${topic.level}.
      + Câu hỏi tiếp theo có thể có 3 câu trả lời mẫu để người dùng tham khảo.
      + Trả về kết quả theo định dạng JSON với cấu trúc chính xác theo mẫu sau: ${JSON.stringify(responseJson)}.
    - Lưu ý, toàn bộ nhận xét hãy viết BẰNG TIẾNG VIỆT, bao gồm:
        + Nội dung / Ý nghĩa (content): Nhận xét về nội dung, ý nghĩa câu trả lời của người dùng có hay hay không.
        + Ngữ pháp (grammar): Nhận xét về ngữ pháp của người dùng, có lỗi gì không, nếu có thì là lỗi gì.
        + Từ vựng / Diễn đạt (vocabulary): Nhận xét về từ vựng và cách diễn đạt của người dùng, có sử dụng từ vựng phù hợp không, có lỗi gì không, nếu có thì là lỗi gì.
        + Cấu trúc câu / Liên kết (sentence structure / coherence): Nhận xét về cấu trúc câu và sự liên kết trong câu trả lời với câu hỏi, có mạch lạc không, có lỗi gì không, nếu có thì là lỗi gì.
        + Phát âm (pronunciation): Nhận xét về phát âm, độ trôi chảy của người dùng dựa trên file audio đính kèm (nếu có), có lỗi gì không, nếu có thì là lỗi gì. Để trống nếu không có file audio.
        + Điểm ước lượng (score): Điểm ước lượng, từ 0 đến 10, dựa trên các tiêu chí trên.

    - Hãy phản hồi một cách tự nhiên và phù hợp với cuộc hội thoại đang diễn ra về chủ đề "${topic.name}".
    - Bạn là một nhân vật trong một cuộc hội thoại luyện tập Tiếng Anh. Và bạn đã hỏi câu hỏi "${topic.question}".
    - Và đây là câu trả lời của người dùng: "${message}" (nếu có file audio đính kèm, hãy sử dụng nội dung được chuyển đổi từ giọng nói sang văn bản (speech-to-text, giữ nguyên nhận dạng nguyên gốc từ file âm thanh) của file audio đó
    - Context của cuộc trò chuyện:      
      + Mô tả ngữ cảnh: ${topic.description}.  
      + Cấp độ: Học sinh lớp ${topic.level} ở Việt Nam.                        
    - Bạn cần:
      - Đưa ra nhận xét về chất lượng chuyên môn về câu trả lời của người dùng (Bằng Tiếng Việt 100%).
      - Trả về kết quả theo định dạng JSON với cấu trúc chính xác theo mẫu sau: ${JSON.stringify(responseJson)}.
    - Yêu cầu:
      - Các nhận xét câu trả lời của người dùng vào trường "result" trong json trả về.
      - Toàn bộ nhận xét hãy viết BẰNG TIẾNG VIỆT, bao gồm:
          + Nội dung / Ý nghĩa (content): Nhận xét về nội dung, ý nghĩa câu trả lời của người dùng có hay hay không.
          + Ngữ pháp (grammar): Highlight <span style="color: #ff0000">[đặt các lỗi ngữ pháp ở đây]</span>. Nhận xét về ngữ pháp (không nhận xét về lỗi chính tả) của người dùng, có lỗi gì không, nếu có thì là lỗi gì:
              <div>  
                <b style="display: inline-block; margin-top: 10px">(1) <span style="color: #ff0000">"[cụm ngữ pháp sai ban đầu]"</span> → <span style="color: #00009b">"[cụm ngữ pháp sau khi sửa]"</span></b><br />
                → [Giải thích ngắn gọn tại sao sai].<br />
              </div>
              <div>
                <b style="display: inline-block; margin-top: 10px">(2) [...]</b><br />
                → [...]
              </div>

          + Từ vựng (vocabulary): Highlight #ff0000 các lỗi từ vựng. Nhận xét về cách dùng từ vựng của người dùng, có sử dụng từ vựng phù hợp không, có sai chính tả không, có lỗi gì không, nếu có thì là lỗi gì:
              <div>  
                <b style="display: inline-block; margin-top: 10px">(1) <span style="color: #ff0000">"[cụm từ vựng sai ban đầu]"</span> → <span style="color: #00009b">"[cụm từ vựng sau khi sửa]"</span></b><br />
                → [Giải thích ngắn gọn tại sao sai].<br />
              </div>
              <div>
                <b style="display: inline-block; margin-top: 10px">(2) [...]</b><br />
                → [...]
              </div>
          + Cấu trúc câu / Liên kết (sentence structure / coherence): Highlight #ff0000 các lỗi về sự mạch lạc và kết nối ý. Nhận xét về cấu trúc câu và sự liên kết trong câu trả lời với câu hỏi, có mạch lạc không, có lỗi gì về ngữ pháp, chính tảkhông, nếu có thì là lỗi gì:
              <div>  
                <b style="display: inline-block; margin-top: 10px">(1) <span style="color: #ff0000">"[cụm sai ban đầu]"</span> → <span style="color: #00009b">"[cụm sau khi sửa]"</span></b><br />
                → [Giải thích ngắn gọn tại sao sai].<br />
              </div>
              <div>
                <b style="display: inline-block; margin-top: 10px">(2) [...]</b><br />
                → [...]
              </div>
          + Phát âm (pronunciation): Nhận xét về phát âm, độ trôi chảy của người dùng dựa trên file audio đính kèm (nếu có), có lỗi gì không, nếu có thì là lỗi gì. Để trống nếu không có file audio.
          + Điểm ước lượng (score): Điểm ước lượng, từ 0 đến 10, dựa trên các tiêu chí trên.
      - Đưa ra 1 động viên, khuyến khích về chất lượng mà bạn đã nhận xét.
      - Giải thích bằng tiếng Việt về cách cải thiện câu trả lời của người dùng, nếu có lỗi thì chỉ rõ là lỗi gì, và giải thích cách dùng cho đúng (explanation)
      - Trả về kết quả theo định dạng JSON với cấu trúc chính xác theo mẫu sau: ${JSON.stringify(responseJson)}
  `;
};

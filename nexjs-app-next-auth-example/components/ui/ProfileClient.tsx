'use client'

import { useEffect, useState } from "react"

interface ProfileData {
    id: string;
    name: string;
    email: string;
}

const ProfileClient =  () => {
    const [data, setData] = useState<ProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/profile')
                if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu profile')
                const profile = await res.json()
                setData(profile.data)
            } catch (err) {
                setError(err.message || 'Lỗi không xác định')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) return <div>Đang tải...</div>
    if (error) return <div className="text-red-500">{error}</div>
    if (!data) return <div>Không có dữ liệu</div>

    return (
        <div>
            <h1>Profile</h1>
            <div className="profile">
                <p>Name: {data.name}</p>
                <p>Email: {data.email}</p>
            </div>
        </div>
    )
}

export default ProfileClient
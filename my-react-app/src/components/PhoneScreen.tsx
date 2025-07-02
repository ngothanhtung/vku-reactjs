function PhoneScreen({children}: {children:React.ReactNode}) {
  
    return (
    <div style={{
        backgroundColor: '#e2e9ee',
        borderRadius: 16,
        padding: 30,
        width: 400,
        height:760,
        
    }}>
        <main style={{
            borderRadius: 16,
            width: '100%',
            maxHeight: '100%',
            overflowX: 'hidden',
            overflowY: 'auto'
        }}>
            {children}
        </main>
    </div>
  )
}

export default PhoneScreen
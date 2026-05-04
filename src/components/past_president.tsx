export default function PastPresidents() {
    const presidents = [
        { name: 'Dr H.L. Mohan', city: 'Delhi', tenure: '2023–24' },
        { name: 'Dr Anant Kumar', city: 'New Delhi', tenure: '2022–23' },
        { name: 'Dr Prem Nath Dogra', city: 'New Delhi', tenure: '2021–22' },
        { name: 'Dr Rajeev Kumar', city: 'New Delhi', tenure: '2020–21' },
    ]
    return (
        <div className='flex flex-col gap-6'>
            <div>
                <h2 className='font-serif text-2xl text-fun-blue-950 mb-3'>Past Presidents</h2>
                <p className='text-fun-blue-800/55 text-[13px] leading-relaxed mb-6'>
                    A record of all former Presidents of the North Zone Urological Society of India.
                </p>
            </div>
            <div className='flex flex-col gap-2.5'>
                {presidents.map((p, i) => (
                    <div key={i} className='flex items-center justify-between p-4 bg-white rounded-xl border border-fun-blue-100'>
                        <div>
                            <div className='font-medium text-[13px] text-fun-blue-950'>{p.name}</div>
                            <div className='text-[11px] text-fun-blue-400/60 mt-0.5'>{p.city}</div>
                        </div>
                        <div className='text-[11px] font-medium text-fun-blue-600 bg-fun-blue-50 border border-fun-blue-100 px-3 py-1 rounded-full'>
                            {p.tenure}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
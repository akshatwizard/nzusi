export default function AboutConstitution() {
    return (
        <div className='flex flex-col gap-6 max-w-2xl'>
            <div>
                <h2 className='font-serif text-2xl text-fun-blue-950 mb-3'>Constitution</h2>
                <p className='text-fun-blue-800/55 text-[13px] leading-relaxed'>
                    The NZUSI Constitution governs the rules, bye-laws and operational framework
                    of the North Zone chapter of the Urological Society of India.
                </p>
            </div>
            <a
                href='#'
                className='inline-flex items-center gap-2 w-max bg-fun-blue-600 hover:bg-fun-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200'
            >
                Download Constitution PDF
            </a>
        </div>
    )
}
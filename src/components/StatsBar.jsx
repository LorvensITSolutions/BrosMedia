import StatsSection from '../framer/stats_section.jsx'

const stats = [
  { value: 12, label: 'Brands Built', suffix: '+', decimals: 0 },
  { value: 12, label: 'Cr Revenue Influenced*', prefix: '₹', suffix: '+', decimals: 0 },
  { value: 6, label: 'Industries', suffix: '+', decimals: 0 },
  { value: 1, label: 'Yr Of Execution', suffix: '+', decimals: 0 },
]

export default function StatsBar() {
  return (
    <section className="relative w-full overflow-hidden bg-black font-sans">
      <div className="relative z-10 w-full">
        <StatsSection
          stats={stats}
          fullWidth
          duration={2}
          separator={false}
          triggerOnView
          divider
          dividerColor="rgba(223, 255, 0, 0.2)"
          numberColor="#dfff00"
          labelColor="rgba(255, 255, 255, 0.7)"
          background="#000000"
          paddingTop={42}
          paddingRight={24}
          paddingBottom={32}
          paddingLeft={24}
          mobilePaddingTop={20}
          columnGap={0}
          rowGap={24}
          minItemWidth={100}
          font={{ fontSize: 40, fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}
          labelFont={{ fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans, sans-serif' }}
        />
      </div>
      <p className="relative z-10 w-full px-4 pb-6 text-center text-[0.65rem] text-white/35 sm:px-6">
        *Approx. client-side revenue influenced - not Brosmedia billing.
      </p>
    </section>
  )
}

import StatsSection from '../framer/stats_section.jsx'

const stats = [
  { value: 13, label: 'Brands Built', suffix: '+', decimals: 0 },
  { value: 6, label: 'Industries', decimals: 0 },
  { value: 1, label: 'Of Execution', suffix: ' Yr', decimals: 0 },
  { value: 360, label: 'Brand Services', suffix: '°', decimals: 0 },
]

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-black font-sans">
      <div className="relative z-10 max-w-9xl">
        <StatsSection
          stats={stats}
          duration={2}
          separator={false}
          triggerOnView
          divider
          dividerColor="rgba(223, 255, 0, 0.2)"
          numberColor="#dfff00"
          labelColor="rgba(255, 255, 255, 0.7)"
          background="#000000"
          paddingTop={40}
          paddingRight={32}
          paddingBottom={40}
          paddingLeft={32}
          columnGap={150}
          rowGap={32}
          minItemWidth={120}
          font={{ fontSize: 40, fontWeight: 700, fontFamily: 'Montserrat, sans-serif' }}
          labelFont={{ fontSize: 14, fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}
        />
      </div>
    </section>
  )
}

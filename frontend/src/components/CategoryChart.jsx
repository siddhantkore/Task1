import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import CategoryIcon from './CategoryIcon'

function splitLabel(value) {
  return value
    .replace('Travel & Accommodation', 'Travel &\nAccommodation')
    .replace('Food & Accessories', 'Food &\nAccessories')
    .replace('Health & Grooming', 'Health &\nGrooming')
    .replace('Recreation & Training', 'Recreation\n& Training')
    .replace('Animal rescue', 'Animal\nrescue')
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const item = payload[0].payload

  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-title">
        <CategoryIcon iconName={item.icon} className="tooltip-icon" />
        <strong>{item.title}</strong>
      </div>
      <span>{item.viewsCount} views</span>
      <span>{item.vendorCount} services</span>
      <span>{item.subCategoryCount} subcategories</span>
    </div>
  )
}

function IconLabel({ x, y, width, payload }) {
  if (!payload?.icon) {
    return null
  }

  return (
    <foreignObject x={x + width / 2 - 18} y={y - 42} width={36} height={36}>
      <div className="bar-icon-wrap">
        <CategoryIcon iconName={payload.icon} className="bar-icon" />
      </div>
    </foreignObject>
  )
}

function CategoryChart({ categories, activeSlug, onSelect }) {
  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={categories}
          margin={{ top: 42, right: 8, left: 8, bottom: 6 }}
          barCategoryGap="24%"
        >
          <XAxis
            dataKey="title"
            tickLine={false}
            axisLine={false}
            interval={0}
            height={88}
            tick={({ x, y, payload }) => {
              const lines = splitLabel(payload.value).split('\n')

              return (
                <g transform={`translate(${x},${y})`}>
                  {lines.map((line, index) => (
                    <text
                      key={`${payload.value}-${line}`}
                      x={0}
                      y={index * 18}
                      dy={20}
                      textAnchor="middle"
                      fill="#2f2f2f"
                      fontSize="15"
                      fontWeight="500"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            }}
          />
          <YAxis hide domain={[0, 'dataMax + 12']} />
          <Tooltip content={<ChartTooltip />} cursor={false} />
          <Bar
            dataKey="viewsCount"
            radius={[18, 18, 0, 0]}
            maxBarSize={74}
            isAnimationActive={false}
            onClick={(data) => onSelect(data.slug)}
          >
            <LabelList content={<IconLabel />} />
            {categories.map((item) => (
              <Cell
                key={item.slug}
                fill={item.slug === activeSlug ? '#f2d47b' : '#f7dfa0'}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CategoryChart

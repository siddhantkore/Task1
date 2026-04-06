import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const SLICE_COLORS = {
  verified: '#f2d47b',
  unverified: '#cfcfcf',
}

function VendorVerificationTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const item = payload[0].payload

  return (
    <div className="chart-tooltip">
      <strong>{item.label}</strong>
      <span>{item.value} vendor{item.value === 1 ? '' : 's'}</span>
    </div>
  )
}

function renderSliceLabel({ cx, cy, midAngle, outerRadius, percent, value, name }) {
  if (!value) {
    return null
  }

  const radius = outerRadius + 18
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

  return (
    <text
      x={x}
      y={y}
      fill="#3b3b3b"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="13"
      fontWeight="600"
    >
      {`${name} (${Math.round(percent * 100)}%)`}
    </text>
  )
}

function VendorVerificationChart({ data, totalVendors }) {
  return (
    <div className="verification-chart-shell">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="48%"
            innerRadius={56}
            outerRadius={84}
            paddingAngle={3}
            labelLine={false}
            label={renderSliceLabel}
            isAnimationActive={false}
          >
            {data.map((item) => (
              <Cell key={item.key} fill={SLICE_COLORS[item.key] || '#d9d9d9'} />
            ))}
          </Pie>
          <Tooltip content={<VendorVerificationTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value, entry) => `${value}: ${entry.payload.value}`}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="verification-total">
        <span>Total Vendors</span>
        <strong>{totalVendors}</strong>
      </div>
    </div>
  )
}

export default VendorVerificationChart

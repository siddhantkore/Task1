import { useEffect, useState } from 'react'
import CategoryCard from './components/CategoryCard'
import CategoryChart from './components/CategoryChart'
import CategoryIcon from './components/CategoryIcon'
import VendorVerificationChart from './components/VendorVerificationChart'
import {
  getCategoryInsights,
  getCategoryVendors,
  getVendorVerificationCounts,
} from './services/api'
import './App.css'

function App() {
  const [insights, setInsights] = useState([])
  const [summary, setSummary] = useState(null)
  const [selectedSlug, setSelectedSlug] = useState('')
  const [selectedVendors, setSelectedVendors] = useState([])
  const [vendorVerification, setVendorVerification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [vendorsLoading, setVendorsLoading] = useState(false)
  const [verificationLoading, setVerificationLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await getCategoryInsights()
        setInsights(response.items)
        setSummary(response.summary)

        if (response.items.length > 0) {
          setSelectedSlug(response.items[0].slug)
        }
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    loadInsights()
  }, [])

  useEffect(() => {
    if (!selectedSlug) {
      return
    }

    const loadVendors = async () => {
      try {
        setVendorsLoading(true)
        const response = await getCategoryVendors(selectedSlug)
        setSelectedVendors(response.items)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setVendorsLoading(false)
      }
    }

    loadVendors()
  }, [selectedSlug])

  useEffect(() => {
    if (!selectedSlug) {
      return
    }

    const loadVendorVerification = async () => {
      try {
        setVerificationLoading(true)
        const response = await getVendorVerificationCounts(selectedSlug)
        setVendorVerification(response)
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setVerificationLoading(false)
      }
    }

    loadVendorVerification()
  }, [selectedSlug])

  const selectedCategory = insights.find((item) => item.slug === selectedSlug)

  return (
    <main className="page">
      <div className="dashboard">
        {loading ? (
          <section className="status-block">Loading insights...</section>
        ) : error ? (
          <section className="status-block status-error">{error}</section>
        ) : (
          <>
            <section className="top-layout">
              <section className="visual-stage">
                <h1>Category</h1>
                <CategoryChart
                  categories={insights}
                  activeSlug={selectedSlug}
                  onSelect={setSelectedSlug}
                />
              </section>

              <aside className="detail-column">
                <div className="detail-section">
                  <p className="section-label">Selected Category</p>
                  {selectedCategory ? (
                    <>
                      <div className="selected-heading">
                        <span className="selected-icon">
                          <CategoryIcon iconName={selectedCategory.icon} />
                        </span>
                        <div>
                          <h2>{selectedCategory.title}</h2>
                          <p className="muted-copy">{selectedCategory.description}</p>
                        </div>
                      </div>

                      <dl className="metric-list">
                        <div>
                          <dt>Views</dt>
                          <dd>{selectedCategory.viewsCount}</dd>
                        </div>
                        <div>
                          <dt>Subcategories</dt>
                          <dd>{selectedCategory.subCategoryCount}</dd>
                        </div>
                        <div>
                          <dt>Services</dt>
                          <dd>{selectedCategory.vendorCount}</dd>
                        </div>
                      </dl>
                    </>
                  ) : null}
                </div>

                <div className="detail-section">
                  <p className="section-label">Verification Split</p>
                  {verificationLoading ? (
                    <div className="status-inline">Loading vendor split...</div>
                  ) : vendorVerification ? (
                    <VendorVerificationChart
                      data={vendorVerification.items}
                      totalVendors={vendorVerification.summary.totalVendors}
                    />
                  ) : (
                    <div className="status-inline">Verification data unavailable.</div>
                  )}
                </div>

                <div className="detail-section">
                  <p className="section-label">Dataset Overview</p>
                  <dl className="summary-grid">
                    <div>
                      <dt>Total Categories</dt>
                      <dd>{summary?.totalCategories ?? 0}</dd>
                    </div>
                    <div>
                      <dt>Total Views</dt>
                      <dd>{summary?.totalViews ?? 0}</dd>
                    </div>
                    <div>
                      <dt>Total Services</dt>
                      <dd>{summary?.totalVendors ?? 0}</dd>
                    </div>
                    <div>
                      <dt>Total Subcategories</dt>
                      <dd>{summary?.totalSubcategories ?? 0}</dd>
                    </div>
                  </dl>
                </div>

                <div className="detail-section">
                  <p className="section-label">All Categories</p>
                  <div className="category-selector">
                    {insights.map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        className={
                          item.slug === selectedSlug
                            ? 'category-selector-item active'
                            : 'category-selector-item'
                        }
                        onClick={() => setSelectedSlug(item.slug)}
                      >
                        <span className="category-selector-icon">
                          <CategoryIcon iconName={item.icon} />
                        </span>
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </section>

            <section className="services-section">
              <div className="services-header">
                <div>
                  <p className="section-label">Services</p>
                  <h3>
                    {selectedCategory
                      ? `${selectedCategory.title} listings`
                      : 'Category listings'}
                  </h3>
                </div>
                <p className="services-count">
                  {selectedVendors.length} result{selectedVendors.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="service-table-head">
                <span>Vendor</span>
                <span>Location</span>
                <span>Details</span>
                <span>Amenities</span>
              </div>

              {vendorsLoading ? (
                <div className="status-inline">Loading services...</div>
              ) : selectedVendors.length === 0 ? (
                <div className="status-inline">No services found for this category.</div>
              ) : (
                <div className="services-list">
                  {selectedVendors.map((vendor) => (
                    <CategoryCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  )
}

export default App

function CategoryCard({ vendor }) {
  return (
    <article className="service-row">
      <div className="service-cell">
        <h4>{vendor.vendorName}</h4>
        <p>{vendor.subcategory?.title ?? 'Service listing'}</p>
      </div>

      <div className="service-cell">
        <strong>{vendor.city || 'Unknown city'}</strong>
        <p>{vendor.location || 'Location not available'}</p>
      </div>

      <div className="service-cell service-detail-cell">
        <span>{vendor.viewsCount} views</span>
        <span>Rating {vendor.rating || 0}</span>
        <span>{vendor.numberOfRatings || 0} reviews</span>
        {vendor.priceRange ? <span>{vendor.priceRange}</span> : null}
        {vendor.isVerified ? <span className="verified-text">Verified</span> : null}
      </div>

      <div className="service-cell">
        <p>{vendor.amenities?.slice(0, 3).join(', ') || 'No amenities listed'}</p>
      </div>
    </article>
  )
}

export default CategoryCard

const NoMoviesView = () => (
  <div className="no-data-view-container">
    <img
      src="https://res.cloudinary.com/dmlk7cxkm/image/upload/v1759162839/Screenshot_2025-09-29_215020_au5i9j.png"
      alt="No Videos"
      className="no-data-view-img"
    />
    <h1 className="no-data-view-heading">No Videos Availabe</h1>
    <p className="no-data-view-description">
      Please try again with a different movie name
    </p>
  </div>
)

export default NoMoviesView

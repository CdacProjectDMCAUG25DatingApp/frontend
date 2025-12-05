import React from 'react'

function ProfileCard() {
    return (
        <div>
            <div className="container align-items-center ">
                <div className=" g-3 align-items-center justify-content-center m-1">
                    <div className="col-sm-12 col-xl-4">
                        <div className="card">
                            <h2 className="card-title m-4">User Name</h2>

                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">

                                    <div className="carousel-item active" style={{ width: "100%", height: "350px", objectFit: "cover", objectPosition: "center" }}>
                                        <img
                                            src="public\WhatsApp Image 2025-12-05 at 3.01.15 PM.jpeg"
                                            className="d-block w-100 img-fluid"
                                            alt="..."
                                        />
                                    </div>

                                    <div className="carousel-item" style={{ width: "100%", height: "350px", objectFit: "cover", objectPosition: "center" }}>
                                        <img
                                            src="public/Acer_Wallpaper_03_5000x2814.jpg"
                                            className="d-block w-100 img-fluid"
                                            alt="..."
                                        />
                                    </div>

                                    <div className="carousel-item" style={{ width: "100%", height: "350px", objectFit: "cover", objectPosition: "center" }}>
                                        <img
                                            src="public/Planet9_Wallpaper_5000x2813.jpg"
                                            className="d-block w-100 img-fluid"
                                            alt="..."
                                        />
                                    </div>

                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>

                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                            <div className="card-body">
                                <p className="card-text">Some quick example text to build on the card title and content.</p>
                                <Link to="#" className="btn btn-primary">Go somewhere</Link>
                            </div>
                        </div>
                    </div>
                    <div className="g-3 align-items-center justify-content-center m-1">
                        <div class="card col-sm-12 col-xl-4">
                            <div class="card-body">
                                <h4 class="card-title">About Me</h4>
                                <hr />
                                <h5>Bio</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <hr />
                                <h5>Age</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Location</h5>
                                <p class="card-text">Pune</p>
                                <hr />
                                <h5>Height & Weight</h5>
                                <p class="card-text">6'7" 60Kg</p>
                                <hr />
                                <h5>Marital Status</h5>
                                <p class="card-text">UnMarried</p>
                            </div>
                        </div>
                        <div class="card col-sm-12 col-xl-4">
                            <div class="card-body">
                                <h4 class="card-title">Cultural Background</h4>
                                <hr />
                                <h5>Religion</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <hr />
                                <h5>Mother Tongue</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Zodiac Sign</h5>
                                <p class="card-text">Pune</p>
                            </div>
                        </div>
                        <div class="card col-sm-12 col-xl-4">
                            <div class="card-body">
                                <h4 class="card-title">Education & Profession</h4>
                                <hr />
                                <h5>Education Level</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <hr />
                                <h5>Job Title</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Industry</h5>
                                <p class="card-text">Pune</p>
                            </div>
                        </div>
                        <div class="card col-sm-12 col-xl-4">
                            <div class="card-body">
                                <h4 class="card-title">LifeStyle</h4>
                                <hr />
                                <h5>Workout</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Diet Type</h5>
                                <p class="card-text">Pune</p>
                                <h5>Smoking</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Drinking</h5>
                                <p class="card-text">23</p>
                                <h5>Sleeping Habit</h5>
                                <p class="card-text">23</p>
                                <h5>Pets</h5>
                                <p class="card-text">23</p>

                            </div>
                        </div>
                        <div class="card col-sm-12 col-xl-4">
                            <div class="card-body">
                                <h4 class="card-title">Personality</h4>
                                <hr />
                                <h5>Communication Style</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Love Style</h5>
                                <p class="card-text">Pune</p>
                                <h5>Personality Type</h5>
                                <p class="card-text">23</p>

                            </div>
                        </div>
                        <div class="card col-sm-12 col-xl-4">
                            <div class="card-body">
                                <h4 class="card-title">Preferences</h4>
                                <hr />
                                <h5>Communication Style</h5>
                                <p class="card-text">23</p>
                                <hr />
                                <h5>Looking For</h5>
                                <p class="card-text">Pune</p>
                                <hr />
                                <h5>Open To</h5>
                                <p class="card-text">23</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default ProfileCard
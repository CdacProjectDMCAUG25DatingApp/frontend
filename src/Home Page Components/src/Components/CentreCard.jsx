export default function CenterCard() {
    return (
        <>
            <div className="home-container">
                <div className="profile-card">
                    <div className="profile-photo">Photo</div>
                    <p className="name-label">Name</p>
                    <div className="actions">
                        <button className="swipe-btn left">Swipe Left</button>
                        <div className="icons">
                            <span className="heart">♡</span>
                            <span className="tick">✔</span>
                        </div>
                        <button className="swipe-btn right">Swipe Right</button>
                    </div>
                </div>
            </div>
        </>
    );
}

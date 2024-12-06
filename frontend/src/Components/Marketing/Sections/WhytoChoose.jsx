export default function WhytoChoose() {
  return (
    <div className="WhytoChoose">
      <h1>
        Why choose <span>Us?</span>
      </h1>
      <div>
        <div className="wtc-info">
          <div className="one-reason">
            <i className="fa-solid fa-tags"></i> {/* For affordability */}
            <div>
              <h2>Affordable Sessions</h2>
              <p>Counseling @ ₹1499 (Regularly ₹5499).</p>
            </div>
          </div>
          <div className="one-reason">
            <i className="fa-solid fa-headset"></i> {/* For support */}
            <div>
              <h2>Free Support</h2>
              <p>Follow-up guidance included (Worth ₹599).</p>
            </div>
          </div>
          <div className="one-reason">
            <i className="fa-solid fa-hand-holding-heart"></i>{" "}
            {/* For personalized care */}
            <div>
              <h2>Personalized Care</h2>
              <p>Solutions tailored to your unique needs.</p>
            </div>
          </div>
          <div className="one-reason">
            <i className="fa-solid fa-users"></i> {/* For expert team */}
            <div>
              <h2>Expert Team</h2>
              <p>Trusted by over 10,000+ happy clients.</p>
            </div>
          </div>
          <div className="one-reason">
            <i className="fa-solid fa-calendar-check"></i>{" "}
            {/* For convenience */}
            <div>
              <h2>Convenient Options</h2>
              <p>Online or offline, your schedule, your choice.</p>
            </div>
          </div>
        </div>
        <div className="wtc-img">
          <img
            src={`${process.env.PUBLIC_URL}/assets/Images/Marketing/why_to_choose_us.svg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

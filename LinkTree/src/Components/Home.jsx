import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();
  return (
    <div className="cont">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="sparklogo.png" alt="Spark Logo" /> <span className="nav-text"><span className="spark">SPARK</span> | Marketplace </span>
        </div>
        <ul className="navbar-links">
          <li><button className="signupbtn" onClick={() => navigate("/signup")}>Sign up free </button></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="container-1">
        {/* Left Content */}
        <div className="content">
          <h1>
            The easiest place to <br /> update and share your Connection
          </h1>
          <p>
            Help your followers discover everything you’re sharing  <br />  all over the internet,
            in one simple place. They’ll thank  <br /> you for it!
          </p>
          <button className="cta-button" onClick={() => navigate("/signup")}>Get your free Spark</button>
        </div>

        {/* Right Side Image */}
        <div className="image-container">
           <img src="Analytics.png" alt="Dashboard UI" className="analyticsimg" />
        </div>
      </div>

      {/* Container-2 */}
      <div className="phonecontent">
        <h1>The best in the class product for you today!</h1>
        <p>
        This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.
        </p>
      </div>
      <div className="container-2-wrapper">
        <div className="container-2">
          {/* Left Content */}
          <div className="content-left">
          <div class="price-card-container">
    <div class="price-card">
        <div class="price">$10</div>
    </div>
    <div class="price-card">
        <div class="price">$20</div>
    </div>
    <div class="price-card">
        <div class="price">$40</div>
    </div>
    <div class="price-card">
        <div class="price">$30</div>
    </div>
    <div class="price-card">
      <img src="krsna.png"></img>
        <div class="price">$4,560</div>
        <div class="label">Revenue</div>
    </div>
</div>
            <p className="content-left-text">
              Sell products and collect payments. It’s <br /> monetization made simple.
            </p>
          </div>

          {/* Right Content */}
          <div className="content-right">
            <h1>Analyze your audience <br /> and keep your followers <br /> engaged</h1>
            <h3>
              Track your engagement over time, monitor revenue and learn <br />
              what’s converting your audience. Make informed updates on the fly <br />
              to keep them coming back.
            </h3>
          </div>
        </div>
      </div>

      {/* Container-3 */}
      <div className="container-3-wrapper">
        <div className="container-3">
         

          {/* Right Content */}
          <div className="content-right">
            <h1>Share limitless content <br/> in limitless ways</h1>
            <h3>
            Connect your content in all its forms and help followers find more of <br/>
             what they’re looking for. Your TikToks, Tweets, YouTube videos, music, <br/>
             articles, recipes, podcasts and more… It all comes together in one <br/>
            powerful place
            </h3>
          </div>

           {/* Left Content */}
           <div className="content-left-3">
           <div className="media">
          <div className="media-content">
            <div className="media-item">
              <img src="bubble.png" alt="Bubble Gum" className="media-image" />
              
            </div>
            <div className="media-item">
              <img src="img1.png" alt="Content" className="media-image" />
            </div>
            <div className="media-i">
              <img src="img2.png" alt="Content" className="img2" />
            </div>
          </div>
         <div> 
          </div>
        </div>
        <p className="media-text">
            Share your content in limitless ways <br /> on your Spark
          </p>
          </div>
        </div>
      </div>
      <div>
        <div className="container-4-wrapper">
        <div className="container-4">
      <div className="customer-section">
        <h2>
          Here's what our <span className="highlight">customer</span> <br/>  has to say
        </h2>
        <button className="customer-btn">Read customer stories</button>
      </div>
      <div className="customer-note">
        <div><img src="star.png" className="asterisk"></img></div>
        <p>
          <span className="short-desc">[short description goes in here]</span>
          Lorem <br/>  ipsum is a placeholder text to <br/>  demonstrate.
        </p>
      </div>
    </div>
        </div>
      </div>
      <div className="container-5-wrapper" >
      <div className="container-5">
      <div className="testimonial-grid">
        <div className="testimonial-card-1">
          <h3>Amazing tool! Saved me months</h3>
          <p>
            This is a placeholder for your testimonials and what your client has to 
            say. Put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="author">
            <div className="avatar"></div>
            <div>
              <strong>John Master</strong>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <h3>Amazing tool! Saved me months</h3>
          <p>
            This is a placeholder for your testimonials and what your client has to 
            say.Put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="author">
            <div className="avatar"></div>
            <div>
              <strong>John Master</strong>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card">
          <h3>Amazing tool! Saved me months</h3>
          <p>
            This is a placeholder for your testimonials and what your client has to 
            say.Put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="author">
            <div className="avatar"></div>
            <div>
              <strong>John Master</strong>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>

        <div className="testimonial-card-1">
          <h3>Amazing tool! Saved me months</h3>
          <p>
            This is a placeholder for your testimonials and what your client has to
            say. Put them here and make sure it's 100% true and meaningful.
          </p>
          <div className="author">
            <div className="avatar">

            </div>
            <div>
              <strong>John Master</strong>
              <p>Director, Spark.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>

      
      <div className="container-5-wrapper-phone">
  <div className="container-5-phone">
    <div className="testimonial-list-phone">
      <div className="testimonial-card-1-phone">
        <h3>Amazing tool! Saved me months</h3>
        <p>
          This is a placeholder for your testimonials and what your client has to 
          say. Put them here and make sure it's 100% true and meaningful.
        </p>
        <div className="author-phone">
          <div className="avatar-phone"></div>
          <div>
            <strong>John Master</strong>
            <p>Director, Spark.com</p>
          </div>
        </div>
      </div>

      <div className="testimonial-card-phone">
        <h3>Amazing tool! Saved me months</h3>
        <p>
          This is a placeholder for your testimonials and what your client has to 
          say. Put them here and make sure it's 100% true and meaningful.
        </p>
        <div className="author-phone">
          <div className="avatar-phone"></div>
          <div>
            <strong>John Master</strong>
            <p>Director, Spark.com</p>
          </div>
        </div>
      </div>

      <div className="testimonial-card-phone">
        <h3>Amazing tool! Saved me months</h3>
        <p>
          This is a placeholder for your testimonials and what your client has to 
          say. Put them here and make sure it's 100% true and meaningful.
        </p>
        <div className="author-phone">
          <div className="avatar-phone"></div>
          <div>
            <strong>John Master</strong>
            <p>Director, Spark.com</p>
          </div>
        </div>
      </div>

      <div className="testimonial-card-1-phone">
        <h3>Amazing tool! Saved me months</h3>
        <p>
          This is a placeholder for your testimonials and what your client has to
          say. Put them here and make sure it's 100% true and meaningful.
        </p>
        <div className="author-phone">
          <div className="avatar-phone"></div>
          <div>
            <strong>John Master</strong>
            <p>Director, Spark.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="container-5-wrapper">
      <div className="container-6">
      <h2>All Link Apps and Integrations</h2>
      <div className="integration-grid">
        <div className="integration-card">
         <div className="logos"> <img src="audio.png" ></img></div>
          <div className="con">
            <strong>Audiomack</strong>
            <p>Add an Audiomack player to your Linktree</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="band.png" ></img></div>
          <div className="con">
            <strong>Bandsintown</strong>
            <p>Drive ticket sales by listing your events</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="bon.png" ></img></div>
          <div className="con">
            <strong>Bonfire</strong>
            <p>Display and sell your custom merch</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="book.png" ></img></div>
          <div className="con">
            <strong>Books</strong>
            <p>Promote books on your Linktree</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="buy.png" ></img></div>
          <div className="con">
            <strong>Buy Me A Gift</strong>
            <p>Let visitors support you with a small gift</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="cam.png" ></img></div>
          <div className="con">
            <strong>Cameo</strong>
            <p>Make impossible fan connections possible</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="club.png" ></img></div>
          <div className="con"> 
            <strong>Clubhouse</strong>
            <p>Let your community in on the conversation</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="comm.png" ></img></div>
          <div className="con">
            <strong>Community</strong>
            <p>Build an SMS subscriber list</p>
          </div>
        </div>

        <div className="integration-card">
        <div className="logos"> <img src="cont.png" ></img></div>         
         <div className="con">
            <strong>Contact Details</strong>
            <p>Easily share downloadable contact details</p>
          </div>
        </div>
      </div>
    </div>
      </div>


    <div className="container-3-wrapper">
    <div className="footer-container">
      <div className="footer-header">
        <div className="button-group">
          <button className="login-button" onClick={() => navigate("/login")}>Log in</button>
          <button className="signup-button" onClick={() => navigate("/signup")}>Sign up free</button>
        </div>
        <div className="footer-links">
          <div className="column">
            <p>About Spark</p>
            <p>Blog</p>
            <p>Press</p>
            <p>Social Good</p>
            <p>Contact</p>
          </div>
          <div className="column">
            <p>Careers</p>
            <p>Getting Started</p>
            <p>Features and How-Tos</p>
            <p>FAQs</p>
            <p>Report a Violation</p>
          </div>
          <div className="column">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Cookie Notice</p>
            <p>Trust Center</p>
          </div>
        </div>
      </div>

      <div className="footer-footer">
        <div className="footer-text">
          <p>
            We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri <br></br> people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
          </p>
        </div>

        <div className="social-icons">
       <button><img src="twitter.png"></img></button>
       <button><img src="insta.png"></img></button>
       <button><img src="yt.png"></img></button>
       <button><img src="tik.png"></img></button>
       <button><img src="sparkli.png"></img></button>

        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Home;

import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">ResumeAI</div>
        <nav>
          
          <ul className="nav-links">
            <div className="main">
            <li className="li_one"><a href="home">Home</a></li>
            <li className="li_two"><a href="features">Features</a></li>
            <li className="li_three"><a href="how">How it Works</a></li>
            <li className="li_four"><a href="about">About</a></li>
            <li className="li_five"><a href="contact">Contact</a></li></div>
            <li ><a href="login" className="login-btn">Login</a></li>
            <li><a href="register" className="register-btn">Register</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="first">
          <div className="in">
           <h1>Land Your Dream Job Faster with AI</h1>
        <p>Upload your resume and get instant insights, screening, and personalized job recommendations.</p>
        <div className="btns">
        <button className="cta-btn">Get Started</button>
         <button className="cta-btn">Get Started</button>
        </div>
        <ul className="list2">
          <li> <span class="dot">🔴</span> Free to start</li>
           <li> <span class="dot">🟠</span> Instant result</li>
            <li><span class="dot">🔵</span> AI-powered</li>

        </ul>
        
        </div>
        </div>


        <div className="second"><div className="outer">
          <div className="imge">
            <img src="https://images.unsplash.com/photo-1587116987928-21e47bd76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBkb2N1bWVudHxlbnwxfHx8fDE3NTY0ODIwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="" />
            <div className="a">AI Score <div className="ain">94%</div></div>
             <div className="b">
              <div className="binn">
              Match Found <div className="bin">Senior Developer</div>
              </div> 
              </div>
              </div>
          </div>
          </div>        
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h1>Powerful Features for Your Success</h1>
<p className="para">Our AI-powered platform provides everything you need to optimize your job search and land your dream position.</p>
        <div className="feature-cards">
          
          
          
       <div className="card">
            
            <div className="rec">Smart Analysis</div>
            <div className="emoji">🔍</div>
            <h3>AI Resume Screening</h3>
            <p>Analyze strengths, weaknesses, and missing skills with advanced AI algorithms..</p>
          </div>
          <div className="card"> <div className="rec">Perfect Matches</div>
            <div className="emoji">🎯</div>
            <h3>Job Match Engine</h3>
            <p>Find jobs best suited to your resume instantly with our intelligent matching system.</p>
          </div>
          <div className="card"> <div className="rec">ATS Ready</div>
            <div className="emoji">⚙️</div>
            <h3>ATS Optimization</h3>
            <p>Improve resume to pass Applicant Tracking Systems and reach human recruiters.</p>
          </div>
          <div className="card"> <div className="rec">Expert Tips</div>
            <div className="emoji">💡</div>
            <h3>Personalized Insights</h3>
            <p>Get tips to make your profile stand out make your profile stand out from the crowd.</p>
          </div>
          <div className="card"> 
            <div className="rec">Smart Analysis</div>
            <div className="emoji">🎯</div>
            <h3>Job Match Engine</h3>
            <p>Find jobs best suited to your resume instantly.</p>
          </div>
        </div><div className="lower">Ready to experience these features ?</div>
        <div className="btns2">
        <button className="btn">Try All Features</button>
         <button className="btn">Learn More</button>
        </div>
      </section>

      <section id="how" className="how">
  <h1 className="head">How It Works</h1>
  <div className="par">
    <p>
      Get started in just three simple steps and transform your job search with
      AI-powered insights.
    </p>
  </div>

  <div className="how-container">
    {/* Left Side - Steps */}
    <div className="steps">
      <div className="step">
        <div className="circle">01</div>
        <div className="content">
          <h3>📄 Upload Resume</h3>
          <p>
            Simply drag and drop your resume or upload it from your device. We
            support PDF, DOC, and DOCX formats.
          </p>
        </div>
      </div>

      <div className="step">
        <div className="circle">02</div>
        <div className="content">
          <h3>🤖 AI Screening & Analysis</h3>
          <p>
            Our advanced AI analyzes your resume, identifies strengths and
            weaknesses, and provides detailed insights.
          </p>
        </div>
      </div>

      <div className="step">
        <div className="circle">03</div>
        <div className="content">
          <h3>🎯 Get Job Recommendations</h3>
          <p>
            Based on the analysis, AI suggests tailored job opportunities to
            match your profile and skills.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Image */}
    <div className="how-image">
      <img
        src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY0NDIwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="AI Analysis"
      />

      <div className="rec2"><p className="par">Processing</p><h3 className="head4"> <span className="dot">🟢</span> Analyzing resume...</h3></div>

      <div className="rec1"><p className="par">Result Ready</p>
      <h3 className="head3">15 job matches Found...</h3></div>


    </div>
  </div>
  <div className="button">Start Your AI Analysis</div>
</section>


      {/* Testimonials Section */}
      <section className="testimonials">

        <h1 className="heading">What Our Users Say</h1>

        <p className="para2">Join thousands of professionals who have accelerated their job search with ResumeAI.</p> 

        <div className="bx">
      <div className="boxes">
      <div className="star">⭐⭐⭐⭐</div><p className="para4">"I got my job faster using ResumeAI! The AI insights helped me optimize my resume and I landed 3 interviews in the first week."</p>
    <div className="three">
      < div className="photo"></div>
      <div className="outerrr">
      <h1 className="headingss">Sarah Johnson</h1>
      <p className="about">Software Engineer at Tech Corp</p>
    </div>

</div>
 </div>

 <div className="boxes"><div className="star">⭐⭐⭐⭐</div><p className="para4">"The ATS optimization feature was a game-changer. My resume started getting past the initial screening and I received more callbacks."</p>
    <div className="three">
      < div className="photo"></div>
      <div className="outerrr">
      <h1 className="headingss">Michael Chen</h1>
      <p className="about">Product Manager at innovation Inc</p>
    </div>

</div></div>



      <div className="boxes"><div className="star">⭐⭐⭐⭐</div><p className="para4">"The personalized job recommendations were spot-on. ResumeAI helped me find positions I wouldn't have discovered otherwise."</p>
    <div className="three">
      < div className="photo"></div>
      <div className="outerrr">
      <h1 className="headingss">Emily Rodriguez</h1>
      <p className="about">UX Designer at Design Studio</p>
    </div>
  


</div></div>

      
</div>

 <hr className="custom-line" />
 < div className="rbox">
 <div className="ratings"><h1>10k+</h1> <p>Resumes Analyzed</p></div>

  <div className="ratings"><h1>85%</h1> <p>Success Rate</p></div>

   <div className="ratings"><h1>2.5x</h1> <p>Faster Job Search</p></div>

    <div className="ratings"><h1>24/7</h1> <p>AI Support</p></div>
       </div>
      </section>

      {/* Footer */}
     <footer className="footer">
  <div className="footer-top">
    <div className="footer-column">
      <h3>ResumeAI</h3>
      <p>
        Accelerate your job search with AI-powered resume optimization and 
        intelligent job matching.
      </p>
      <div className="social-icons">
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-linkedin"></i></a>
        <a href="#"><i className="fab fa-pinterest"></i></a>
      </div>
    </div>

    <div className="footer-column">
      <h3>Product</h3>
      <ul>
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">Integrations</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Company</h3>
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div className="footer-column">
      <h3>Legal</h3>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Cookie Policy</a></li>
        <li><a href="#">GDPR</a></li>
      </ul>
    </div>
  </div>

  {/* Divider Line */}
  <hr className="footer-line" />

  <div className="footer-bottom">
    <p>© 2025 ResumeAI. All rights reserved.</p>
    <p>Made with ❤️ for job seekers</p>
  </div>
</footer>

    </div>
  );
};

export default Home;

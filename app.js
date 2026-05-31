const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer"); // 🌟 Sirf email sending package required hai

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files Layout Configurations
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, "style")));
app.use(express.static(path.join(__dirname, "JS")));

// View Engine Setup
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Routes ---

// Home Route
app.get("/", (req, res) => {
  const profileData = {
    name: "ARUN",
    title: "Front-End <br />Developer & Designer <br />Azure Certified",
    description: "Blending thoughtful UI design with clean, responsive development to create websites that look great and perform flawlessly.",
    cvLink: "/downloads/arun-cv.pdf",
    profileImage: "https://res.cloudinary.com/dxgaylapl/image/upload/v1779972678/1000379439_p0onmk.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/arun-kahar-4b404b217/",
      github: "https://github.com/arunkahar09"
    },
    skills: [
      { name: "C++", icon: "fa-regular fa-gem", isLocked: false },
      { name: "Frontend Dev", icon: "fa-regular fa-gem", isLocked: false },
      { name: "HTML / CSS", icon: "fa-regular fa-gem", isLocked: false },
      { name: "JavaScript", icon: "fa-regular fa-gem", isLocked: false },
      { name: "DBMS", icon: "fa-regular fa-gem", isLocked: false },
      { name: "Learning...", icon: "", isLocked: true },
      { name: "Learning...", icon: "", isLocked: true }
    ],
    projects: [
      {
        title: "E-Commerce Platform",
        category: "Web Design",
        description: "A minimal digital shopping experience constructed with clean code framework mechanics and user interaction flows.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600",
        link: "#"
      },
      {
        title: "SaaS Analytics Dashboard",
        category: "Development",
        description: "High-performance complex user data panels displaying operational metrics with responsive layouts and pixel design grid systems.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
        link: "#"
      },
      {
        title: "Creative Studio Landing",
        category: "Branding",
        description: "Modern agency portfolio highlighting seamless animations, rich contrast structure typography, and components.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
        link: "#"
      }
    ],
    about: {
      shortDesc: "I'm a front-end developer and designer passionate about crafting clean, intuitive, and responsive digital experiences.",
      longDesc: "I focus on turning complex ideas into seamless interfaces by understanding user needs, designing thoughtful UI layouts, and ensuring smooth, premium interactions across all platforms and devices.",
      steps: [
        { id: "01", text: "Understand users & goals" },
        { id: "02", text: "Create clean UI layouts" },
        { id: "03", text: "Responsive experiences" }
      ],
      stats: [
        { value: "02+", label: "Years Of Experience" },
        { value: "15+", label: "Projects Completed" },
        { value: "05+", label: "Clients Served" }
      ]
    }
  };
  res.render("home", profileData);  
});

// Contacts GET Route
app.get('/contact', (req, res) => {
  res.render('contact', {
    contactEmail: "arunkahar09@gmail.com",
    location: "Madhya Pradesh, India",
    socials: {
      linkedin: "https://www.linkedin.com/in/arun-kahar-4b404b217/",
      github: "https://github.com/arunkahar09"
    }
  });
});

// 🌟 Contacts POST Route: Sirf Email par mail bhejne ke liye
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // EMAIL TRIGGER SYSTEM (Nodemailer Configuration)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "arunkahar09@gmail.com",
        pass: process.env.EMAIL_PASS // Vercel dashboard se secure aayega
      }
    });

    const mailOptions = {
      from: "arunkahar09@gmail.com",
      to: "arunkahar09@gmail.com", // Aapko khud apne hi mail par notification milega
      subject: `Portfolio Lead: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f4f4f5; border-radius: 10px;">
          <h2 style="color: #4f46e5;">New Contact Form Submission!</h2>
          <hr style="border: 0; border-top: 1px solid #e4e4e7;" />
          <p><b>Name:</b> ${name}</p>
          <p><b>Sender Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b></p>
          <div style="background: #ffffff; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; font-style: italic;">
            ${message}
          </div>
        </div>
      `
    };
    
    // Email fire executing trigger
    await transporter.sendMail(mailOptions);

    // Mail successfully jaane ke baad redirect back to home page
    res.redirect("/?success=true");

  } catch (error) {
    console.error("Mail Delivery System Failure:", error);
    res.redirect("/?success=false");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});






// const express = require("express");
// const app = express();
// const path = require("path");
// const nodemailer = require("nodemailer");
// const sqlite3 = require("sqlite3").verbose(); // Fixed: Uncommmented this line
// // const fs = require("fs");

// const db = new sqlite3.Database("data.db");

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static Files
// app.use(express.static(path.join(__dirname)));
// app.use('/src', express.static(path.join(__dirname, 'src')));
// app.use(express.static(path.join(__dirname, "style")));
// app.use(express.static(path.join(__dirname, "JS")));

// // View Engine Setup
// const port = process.env.PORT || 8080;
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // --- Routes ---

// // Home Route
// app.get("/", (req, res) => {

//   const profileData = {
//         name: "ARUN",
//         // Using <%- title %> allows us to pass <br /> tags directly from backend safely
//         title: "Front-End <br />Developer & Designer <br />Azure Certified",
//         description: "Blending thoughtful UI design with clean, responsive development to create websites that look great and perform flawlessly.",
//         cvLink: "/downloads/arun-cv.pdf",
//         profileImage: "https://res.cloudinary.com/dxgaylapl/image/upload/v1779972678/1000379439_p0onmk.webp",
//         socials: {
//             linkedin: "https://www.linkedin.com/in/arun-kahar-4b404b217/",
//             github: "https://github.com/arunkahar09"
//         },
//         // Skills 
//         skills: [
//             { name: "C++", icon: "fa-regular fa-gem", isLocked: false },
//             { name: "Frontend Dev", icon: "fa-regular fa-gem", isLocked: false },
//             { name: "HTML / CSS", icon: "fa-regular fa-gem", isLocked: false },
//             { name: "JavaScript", icon: "fa-regular fa-gem", isLocked: false },
//             { name: "DBMS", icon: "fa-regular fa-gem", isLocked: false },
//             { name: "Learning...", icon: "", isLocked: true },
//             { name: "Learning...", icon: "", isLocked: true }
//         ],
//         projects: [
//         {
//             title: "E-Commerce Platform",
//             category: "Web Design",
//             description: "A minimal digital shopping experience constructed with clean code framework mechanics and user interaction flows.",
//             image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600",
//             link: "#"
//         },
//         {
//             title: "SaaS Analytics Dashboard",
//             category: "Development",
//             description: "High-performance complex user data panels displaying operational metrics with responsive layouts and pixel design grid systems.",
//             image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
//             link: "#"
//         },
//         {
//             title: "Creative Studio Landing",
//             category: "Branding",
//             description: "Modern agency portfolio highlighting seamless animations, rich contrast structure typography, and components.",
//             image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
//             link: "#"
//         }
//     ],about: {
//             shortDesc: "I'm a front-end developer and designer passionate about crafting clean, intuitive, and responsive digital experiences.",
//             longDesc: "I focus on turning complex ideas into seamless interfaces by understanding user needs, designing thoughtful UI layouts, and ensuring smooth, premium interactions across all platforms and devices.",
//             steps: [
//                 { id: "01", text: "Understand users & goals" },
//                 { id: "02", text: "Create clean UI layouts" },
//                 { id: "03", text: "Responsive experiences" }
//             ],
//             // 🌟 YEH MISSING THA: stats array ko yahan add karein
//             stats: [
//                 { value: "02+", label: "Years Of Experience" },
//                 { value: "15+", label: "Projects Completed" },
//                 { value: "05+", label: "Clients Served" }
//             ]
//         }
//     };


//   res.render("home", profileData);  
// });


// // Contacts as

// app.get('/contact', (req, res) => {
//     // Pass the required context variables if your contact.ejs expects them
//     res.render('contact', {
//         contactEmail: "arunkahar09@gmail.com",
//         location: "Madhya Pradesh, India",
//         socials: {
//             linkedin: "https://www.linkedin.com/in/arun-kahar-4b404b217/",
//             github: "https://github.com/arunkahar09"
//         }
//     });
// });
// // Data Route
// app.get("/data", (req, res) => {
//   db.all("SELECT * FROM images", (err, rows) => {
//     if (err) return res.status(500).send("Database Error fetching images");
//     res.render("page", { rows });
//   });
// });

// // Media Routes
// app.get('/media', (req, res) => {
//   res.render('media', { section: 'overview' });
// });

// app.get('/media/:section', (req, res) => {
//   const section = req.params.section;
//   res.render('media', { section });
// });

// // Plan Routes


// app.get('/plan/:section', (req, res) => {
//   const section = req.params.section;
//   res.render('plan', { section });
// });

// // Book Routes
// app.get('/book/:section', (req, res) => {
//   const section = req.params.section;
//   res.render('book', { section });
// });

// // Admin Route
// app.get('/admin', (req, res) => {
//   res.render('admin', { message: null }); // Fixed: Removed the duplicate /admin route below
// });

// // Other Routes
//   app.get('/experiences', (req, res) => res.render('experiences'));
// app.get('/search', (req, res) => res.render('search'));

// // Start Server
// app.listen(port, () => {
//   console.log(`Express port ${port}`);
//   console.log(`http://localhost:${port}`);
// });
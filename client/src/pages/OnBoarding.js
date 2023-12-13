import { useState } from "react";
import { useCookies } from "react-cookie";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoarding = () => {

  const majors = [
      'Accounting',
      'Actuarial Science',
      'Aerospace Engineering',
      'African-American Studies',
      'Agricultural Business',
      'Agricultural Science',
      'Agricultural Economics',
      'Agricultural Education',
      'Agricultural Engineering',
      'Agricultural Science and Technology',
      'Agronomy',
      'Animal Science',
      'Anthropology',
      'Applied Mathematics',
      'Architecture',
      'Art History',
      'Astrophysics',
      'Atmospheric Science',
      'Biochemistry',
      'Biological Engineering',
      'Biological Sciences',
      'Biomedical Engineering',
      'Biotechnology',
      'Business Administration',
      'Business Analytics',
      'Chemical Engineering',
      'Chemistry',
      'Child Development',
      'Civil Engineering',
      'Classics',
      'Clinical Laboratory Science',
      'Cognitive Science',
      'Communication Studies',
      'Computer Engineering',
      'Computer Science',
      'Construction Management',
      'Criminal Justice',
      'Criminology',
      'Dance',
      'Data Science',
      'Dental Hygiene',
      'Digital Media',
      'Early Childhood Education',
      'Earth Science',
      'Ecology',
      'Economics',
      'Education',
      'Electrical Engineering',
      'Elementary Education',
      'Engineering Physics',
      'English',
      'Entrepreneurship',
      'Environmental Engineering',
      'Environmental Science',
      'Ethnic Studies',
      'Exercise Science',
      'Fashion Design',
      'Finance',
      'Food Science',
      'Forensic Science',
      'French',
      'Game Design',
      'Gender Studies',
      'Genetics',
      'Geography',
      'Geology',
      'Graphic Design',
      'Health Administration',
      'Health and Wellness',
      'History',
      'Horticulture',
      'Hospitality Management',
      'Human Resource Management',
      'Industrial Design',
      'Industrial Engineering',
      'Information Systems',
      'Information Technology',
      'Interior Design',
      'International Business',
      'International Relations',
      'Italian',
      'Journalism',
      'Kinesiology',
      'Landscape Architecture',
      'Law',
      'Linguistics',
      'Management',
      'Marketing',
      'Materials Science',
      'Mathematics',
      'Mechanical Engineering',
      'Media Studies',
      'Medical Laboratory Science',
      'Meteorology',
      'Microbiology',
      'Middle Eastern Studies',
      'Music',
      'Nanotechnology',
      'Neuroscience',
      'Nuclear Engineering',
      'Nursing',
      'Nutrition',
      'Occupational Therapy',
      'Operations Management',
      'Optometry',
      'Organizational Psychology',
      'Paleontology',
      'Pharmacy',
      'Philosophy',
      'Photography',
      'Physics',
      'Physiology',
      'Political Science',
      'Psychology',
      'Public Health',
      'Public Relations',
      'Radiologic Technology',
      'Real Estate',
      'Rehabilitation Counseling',
      'Religious Studies',
      'Respiratory Therapy',
      'Robotics',
      'Russian',
      'Social Work',
      'Sociology',
      'Software Engineering',
      'Spanish',
      'Special Education',
      'Sports Management',
      'Statistics',
      'Sustainable Agriculture',
      'Sustainable Design',
      'Teaching English as a Second Language (TESL)',
      'Theatre',
      'Urban Planning',
      'Veterinary Science',
      'Video Game Design',
      'Web Development',
      'Wildlife Biology',
      "Women's Studies",
      'Zoology',
      'others'
  ];

  const subjects = [
  "None",
  'Aerospace Engineering',
  'Advanced Calculus',
  'Advanced Physics Laboratory',
  'Advanced Topics in Psychology',
  'Advanced Topics in Sociology',
  'African-American Studies',
  'Art History: Ancient to Renaissance',
  'Artificial Intelligence',
  'Astrophysics',
  'Automotive Engineering',
  'Biomedical Engineering',
  'Biotechnology',
  'Biotechnology Engineering',
  'Business Analytics',
  'Business Communication',
  'Business Ethics',
  'Calculus I',
  'Cartography',
  'Chemical Engineering',
  'Chemistry for Engineers',
  'Civil Engineering',
  'Climate Science',
  'Comparative Politics',
  'Computer Engineering',
  'Computer Graphics',
  'Computer Networks',
  'Computer Science',
  'Condensed Matter Physics',
  'Cosmology',
  'Counseling Psychology',
  'Criminal Justice',
  'Criminology',
  'Cultural Anthropology',
  'Cultural Studies',
  'Cybersecurity',
  'Data Science',
  'Development Studies',
  'Differential Equations',
  'Digital Marketing',
  'Digital Marketing Strategies',
  'Drama/Theater',
  'Earth Science',
  'Economic Geography',
  'Economics',
  'Education',
  'Educational Psychology',
  'Electric Circuits',
  'Electrical Engineering',
  'Electronics',
  'Elementary Japanese I',
  'Elementary Spanish I',
  'Engineering Ethics',
  'English Composition',
  'Environmental Chemistry',
  'Environmental Engineering',
  'Environmental Geography',
  'Environmental Science',
  'Ethics',
  'Ethics in Science and Technology',
  'Film Studies',
  'Finance',
  'Financial Management',
  'Fluid Dynamics',
  'Forensic Science',
  'Game Development',
  'Gender Studies',
  'General Relativity',
  'Geographic Information Systems',
  'Geography',
  'Geology',
  'Geopolitics',
  'Geotechnical Engineering',
  'Globalization',
  'Graphic Design',
  'Health Informatics',
  'History of Modern Art',
  'Human Anatomy and Physiology',
  'Human Behavior',
  'Human Resource Management',
  'Human Rights',
  'Human-Computer Interaction',
  'Human Development',
  'Human Geography',
  'Human Genetics',
  'Human Rights',
  'Industrial Design',
  'Industrial Engineering',
  'Information Systems',
  'International Business',
  'International Law',
  'International Relations',
  'Journalism',
  'Linguistics',
  'Macroeconomics',
  'Machine Learning',
  'Marine Biology',
  'Marketing',
  'Materials Engineering',
  'Materials Science',
  'Mathematical Logic',
  'Mathematics',
  'Mechanical Engineering',
  'Media Studies',
  'Medical Ethics',
  'Meteorology',
  'Microbiology',
  'Microeconomics',
  'Mobile App Development',
  'Mobile Computing',
  'Modern Physics',
  'Music Theory',
  'Nanotechnology',
  'Natural Language Processing',
  'Nuclear Engineering',
  'Nuclear Physics',
  'Oceanography',
  'Operations Management',
  'Optics',
  'Particle Physics',
  'Philosophy',
  'Philosophy of Mind',
  'Physical Geography',
  'Physical Therapy',
  'Physics',
  'Planetary Science',
  'Political Economy',
  'Political Geography',
  'Political Philosophy',
  'Political Science',
  'Psychology',
  'Public Health',
  'Public Policy',
  'Public Relations',
  'Quantum Mechanics',
  'Renewable Energy',
  'Robotics',
  'Robotics Engineering',
  'Science Fiction Studies',
  'Social Geography',
  'Social Work',
  'Sociology',
  'Software Engineering',
  'Spanish',
  'Sports Medicine',
  'Statistical Mechanics',
  'Statistics',
  'Structural Engineering',
  'Sustainable Design',
  'Systems Engineering',
  'Theoretical Physics',
  'Thermodynamics',
  'Urban Geography',
  'Virtual Reality',
  'Web Development',
  'Wildlife Conservation',
  'World History',
  'World Religions',
  'World Religions: Eastern Traditions',
  'World Religions: Western Traditions',
];

  const learningStyles = [
    'Visual',
    'Auditory',
    'Kinesthetic/Tactile',
    'Reading/Writing',
    'Social',
    'Solitary',
    'Logical/Mathematical',
    'Verbal/Linguistic',
    'Naturalistic'
  ];
  
  const [cookies, setCookie, removeCookie] = useCookies("user");
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    is_tutor: false,
    classification: "",
    major: "",
    subject: "",
    skill: "",
    learning_style: "",
    url: "",
    about: "",

    matches: [],
    
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8000/user", {
        formData,
      });
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };



  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    


    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Classification</label>
            <div className="multiple-input-container">
              <input
                id="freshman-class-identity"
                type="radio"
                name="classification"
                value="Freshman"
                onChange={handleChange}
                checked={formData.classification === "Freshman"}
              />

              <label htmlFor="freshman-class-identity">Freshman</label>
              <input
                id="sophomore-class-identity"
                type="radio"
                name="classification"
                value="Sophomore"
                onChange={handleChange}
                checked={formData.classification === "Sophomore"}
              />

              <label htmlFor="sophomore-class-identity">Sophomore</label>
              <input
                id="junior-class-identity"
                type="radio"
                name="classification"
                value="Junior"
                onChange={handleChange}
                checked={formData.classification === "Junior"}
              />

              <label htmlFor="junior-class-identity">Junior</label>

              <input
                id="senior-class-identity"
                type="radio"
                name="classification"
                value="Senior"
                onChange={handleChange}
                checked={formData.classification === "Senior"}
              />

              <label htmlFor="senior-class-identity">Senior</label>
            </div>

            <label htmlFor="is-tutor">Are you a Tutor?</label>
            <input
              id="is_tutor"
              type="checkbox"
              name="is_tutor"
              onChange={handleChange}
              checked={formData.is_tutor}
            />
   


            <label htmlFor="major">Select Your Major</label>
        <select name="major" id="major" value={formData.major} onChange={handleChange}>
          <option value="">Select...</option>
          {majors.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </select>

        <label htmlFor="subject">What do you want to learn</label>
        <select name="subject" id="subject" value={formData.subject} onChange={handleChange}>
          <option value="">Select...</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>


        <label htmlFor="skill">What do you want to teach</label>
        <select name="skill" id="skill" value={formData.skill} onChange={handleChange}>
          <option value="">Select...</option>
          {subjects.map((skill, index) => (
            <option key={index} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label htmlFor="learning_style">Choose Your Best Learning Style</label>
        <select name="learning_style" id="learning_style" value={formData.learning_style} onChange={handleChange}>
          <option value="">Select...</option>
          {learningStyles.map((style, index) => (
            <option key={index} value={style}>
              {style}
            </option>
          ))}
        </select>


            <label htmlFor="about">Tell us about you</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="about">Profile Picture</label>
            <input type="url" name="url" id="url" onChange={handleChange} />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile-pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;

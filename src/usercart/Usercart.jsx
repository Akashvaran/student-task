
import PropTypes from 'prop-types';
import './Usercart.css';

const userData = [
  {
    name: "Akash",
    city: "Aranthaki",
    course: "Full Stack Developer",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Java", "Database"],
    online: true,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
  },
  {
    name: "Thavasi Ramaan",
    city: "Papanur",
    course: "Business Administrator",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Java", "Database"],
    online: false,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
  },
  {
    name: "Akash",
    city: "Aranthaki",
    course: "Full Stack Developer",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Java", "Database"],
    online: true,
    profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s",
  },
];

function Usercart({ name, city, course, online, profile, skills }) {
  return (
    <div className='root'>
      <div className='cardcontainer'>
        <span className={online ? "active online" : "active offline"}>
          {online ? "ONLINE" : "OFFLINE"}
        </span>
        <img src={profile} alt='User' className='image' />
        <h3>{name}</h3>
        <h3>{city}</h3>
        <p>{course}</p>
        <div className='button'>
          <button className='primary'>Message</button>
          <button className='primary outline'>Following</button>
        </div>
        <div className='skills'>
          <h5>Skills</h5>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// PropTypes for validation
Usercart.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
  profile: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const Mydata = () => {
  return (
    <>
      {userData.map((value, index) => (
        <Usercart
          key={index}
          name={value.name}
          city={value.city}
          course={value.course}
          online={value.online}
          profile={value.profile}
          skills={value.skills}
        />
      ))}
    </>
  );
};

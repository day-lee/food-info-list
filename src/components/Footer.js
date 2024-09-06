import copyright from "../assets/copyright.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import notion from "../assets/notionLogo.svg";

function Footer() {
  return (
    <div className="flex-col bg-grey h-[140px] p-10">
      <div className="flex gap-1 justify-center">
        <a
          href="https://www.linkedin.com/in/dev-dayeonlee/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-10" src={linkedin} alt="linkedin" />
        </a>
        <a
          href="https://github.com/day-lee/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-10" src={github} alt="github" />
        </a>
        <a
          href="https://diamond-law-064.notion.site/Dayeon-Lee-Frontend-Engineer-1ee316387444473280bf56fe2eab6be4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="w-10" src={notion} alt="notionPortfolio" />
        </a>
      </div>
      <div className="flex items-center justify-center gap-1 p-2">
        <img className="w-4 h-4" src={copyright} alt="Copyright" />
        <span>2024 all rights reserved | day-lee</span>
      </div>
    </div>
  );
}
export default Footer;

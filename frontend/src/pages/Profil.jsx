import LogForm from "../components/LogForm/indexForm";
import "./stylesPages/profil.css"
const Profil = () => {

  return (
    <>
    <div className="profil-page">
        <div className="log-container">
          <LogForm signin={false} signup={true} />
        </div>
    </div>
    </>
  );
};

export default Profil;
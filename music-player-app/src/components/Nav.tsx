import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

interface props {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: FC<props> = ({ isOpened, setIsOpened }) => {
  return (
    <nav>
      <h2>MyPlay</h2>
      <button onClick={() => setIsOpened(!isOpened)}>
        <h2>{<FontAwesomeIcon icon={faMusic} />} Library</h2>
      </button>
    </nav>
  );
};

export default Nav;

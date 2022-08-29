import { useState } from "react";
import { Link } from "react-router-dom";

import { LeftSidebar } from "./LeftSidebar";
import { ModalMenuMobile } from "./ModalMenuMobile";

export const MenuModalAside = () => {
  const [widthWindow, setWidthWindow] = useState(document.body.clientWidth);
  const [modalMenuMobile, setModalMenuMobile] = useState(false);

  // const widthWindow = window.screen.width;

  window.addEventListener("resize", () => {
    setWidthWindow(document.body.clientWidth);
  });

  const showMenuModal = () => {
    setModalMenuMobile((v) => !v);
  };

  return widthWindow > 1047 ? (
    <LeftSidebar />
  ) : (
    <>
      <div className="mobile-bar">
        <Link className="mobile-title" to={"/dashboard"}>
          Oh my Task
        </Link>
        <button
          type="button"
          className="button-show-menu"
          onClick={() => showMenuModal()}
        >
          <img src="/menuIcon.svg" alt="menu button" />
        </button>
      </div>
      {modalMenuMobile && (
        <ModalMenuMobile
          showMenuModal={showMenuModal}
          modalMenuMobile={modalMenuMobile}
        />
      )}
    </>
  );
};

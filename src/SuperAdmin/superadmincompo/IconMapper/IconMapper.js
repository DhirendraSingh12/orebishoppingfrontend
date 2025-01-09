import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faRotate,
  faPenToSquare,
  faDownload,
  faPlus,
  faHome,
  faAngleRight,
  faBars,
  faUser,
  faSignOutAlt,
  faEnvelope,
  faCog, 
  faClose,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { Icons } from "../../components/assets/Icons";

const iconMap = {
  trash: faTrash,
  rotate: faRotate,
  pen: faPenToSquare,
  download: faDownload,
  plus: faPlus,
  home: faHome,
  right: faAngleRight,
  bars: faBars,
  linkedin: faLinkedin,
  account: faUser,
  logout: faSignOutAlt,
  inbox: faEnvelope,
  settings: faCog,
  close: faClose,
  calendar:faCalendar
};

const IconMapper = ({ iconName, isFontAwesome = false, ...props }) => {
  if (isFontAwesome) {
    const icon = iconMap[iconName];
    if (!icon) {
      console.error(`FontAwesome icon ${iconName} not found.`);
      return null;
    }
    return <FontAwesomeIcon icon={icon} {...props} />;
  } else {
    const Icon = Icons[iconName];
    if (!Icon) {
      console.error(`Image icon ${iconName} not found.`);
      return null;
    }
    return <img src={Icon} alt={iconName} {...props} />;
  }
};

export default IconMapper;

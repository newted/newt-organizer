import React from "react";
import { FiBook, FiMap, FiTrello } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
// Styling
import styles from "./Sidebar.module.css";

export default [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <FiTrello size={20} className={styles.icon} />
  },
  {
    name: "Courses",
    route: "/courses",
    icon: <FiBook size={20} className={styles.icon} />
  },
  {
    name: "Learn",
    route: "/learn",
    icon: <FaBrain size={20} className={styles.icon} />
  },
  {
    name: "Learning Map",
    route: "/learning-map",
    icon: <FiMap size={20} className={styles.icon} />
  }
];

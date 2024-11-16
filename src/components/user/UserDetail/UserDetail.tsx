import styles from "./UserDetail.module.css";

type UserDetailProps = {
  label: string;
  userData: string;
}

const UserDetail = ({label, userData}: UserDetailProps) => {
  return (
    <div>
      <p className={styles.userLabel}>{label}</p>
      <p className={styles.userData}>{userData}</p>
    </div>
  )
}

export default UserDetail;

// NOTE: userページのレイアウトに@modalスロットをpropsとして渡し、childrenと並行してレンダリングさせています。
const UserPageLayout = ({
  children,
  modal,
}: { children: React.ReactNode; modal: React.ReactNode }) => {
  return (
    <>
      {children}
      {modal}
      <div id="modal-root" />
    </>
  );
};

export default UserPageLayout;

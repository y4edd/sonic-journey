// NOTE: playlistページのレイアウトに@modalスロットをpropsとして渡し、childrenと並行してレンダリングさせています。
const PlayListPageLayout = ({
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

export default PlayListPageLayout;

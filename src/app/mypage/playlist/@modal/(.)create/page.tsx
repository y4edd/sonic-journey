import Modal from "@/components/mypage/Modal/Modal";
import PlaylistForm from "@/components/mypage/PlaylistForm/PlaylistForm";

// NOTE: @modalスロットの中で、/createルートをインターセプトしています。
// NOTE: ソフトナビゲーションにより、`/mypage/playlist/create`に画面遷移したときに表示されるページです。
const CreatePage = () => {
  return (
    <>
      <Modal>
        <PlaylistForm />
      </Modal>
    </>
  );
};

export default CreatePage;

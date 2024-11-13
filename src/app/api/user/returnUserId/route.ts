export const fetchUser = async (): Promise<{ id: string | null; error: string | null }> => {
  try {
    const response = await fetch("/api/user/checkLogin", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { id: data.id, error: null };
    } else {
      const error = await response.json();
      return { id: null, error: error.message };
    }
  } catch (err) {
    console.error("サーバーエラーが発生しました", err);
    return { id: null, error: "サーバーエラーが発生しました" };
  }
};

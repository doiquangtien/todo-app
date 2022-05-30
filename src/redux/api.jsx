import {
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import {
  getTodo,
  deleteTodo,
  updateTodo,
  ToastMessageAction,
  loadingAction,
  loadingBtnAction,
} from "../reducer/todoSlice";
import {
  postListAction,
  deleteListAction,
  getListByIdAction,
} from "../reducer/listSlice";

// export const getListApi = async (dispatch, id, isSubscribe) => {
//   try {
//     const docRef = collection(db, "users", id, "list");
//     const docSnap = await getDocs(docRef);
//     const list = [];
//     docSnap.forEach((doc) => {
//       list.push(doc.data());
//     });
//     if (isSubscribe && docSnap) {
//       dispatch(getListAction(list));
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getListById = async (dispatch, id_user, id_list, isSubscribe) => {
  try {
    dispatch(loadingAction(true));
    const unsub = onSnapshot(
      doc(db, "users", id_user, "list", id_list),
      (doc) => {
        if (isSubscribe && doc) {
          dispatch(getListByIdAction(doc?.data()));
          dispatch(getTodo(doc.data()?.todos));
          dispatch(loadingAction(false));
        }
      }
    );
    return () => {
      dispatch(loadingAction(false));
      unsub();
    };
  } catch (err) {
    console.log(err);
  }
};

export const postListApi = async (dispatch, data, id_user, id_list) => {
  await setDoc(doc(db, "users", id_user, "list", id_list), {
    ...data,
    id: id_list,
  });

  dispatch(
    postListAction({
      ...data,
      id: id_list,
    })
  );
};

export const deleteListApi = async (dispatch, id_user, id_list) => {
  try {
    await deleteDoc(doc(db, "users", id_user, "list", id_list));
    dispatch(deleteListAction(id_list));
  } catch (err) {
    console.log(err);
  }
};

export const postTodoApi = async (
  dispatch,
  data,
  todoList,
  id_user,
  id_list,
  handleOpenToast
) => {
  try {
    dispatch(loadingBtnAction(true));

    await updateDoc(doc(db, "users", id_user, "list", id_list), {
      todos: [...todoList, data],
    });

    dispatch(loadingBtnAction(false));

    dispatch(
      ToastMessageAction({
        message: "Add task successful !",
        severity: "success",
      })
    );
    handleOpenToast();
  } catch (err) {
    dispatch(loadingBtnAction(false));
    dispatch(
      ToastMessageAction({
        message: "WHOOPS! Something went wrong please try again ",
        severity: "warning",
      })
    );
    handleOpenToast();
    console.log(err);
  }
};

export const deleteTodoApi = async (
  dispatch,
  id_user,
  id_list,
  id_todo,
  todoList,
  handleOpenToast
) => {
  try {
    const newDeleteListTodo = [...todoList].filter(
      (item) => item.id !== id_todo
    );
    await updateDoc(doc(db, "users", id_user, "list", id_list), {
      todos: newDeleteListTodo,
    });
    dispatch(deleteTodo(newDeleteListTodo));
    dispatch(
      ToastMessageAction({
        message: "Delete task successful !",
        severity: "success",
      })
    );
    handleOpenToast();
  } catch (err) {
    dispatch(
      ToastMessageAction({
        message: "WHOOPS! Something went wrong please try again ",
        severity: "warning",
      })
    );
    handleOpenToast();
    console.log(err);
  }
};

export const editTodoApi = async (
  dispatch,
  dataEdit,
  todoList,
  id_user,
  id_list,
  id_todo,
  handleOpenToast
) => {
  try {
    const newUpdateList = [...todoList].map((item) => {
      if (item.id === id_todo) {
        return { ...item, ...dataEdit };
      }
      return item;
    });
    await updateDoc(doc(db, "users", id_user, "list", id_list), {
      todos: newUpdateList,
    });
    dispatch(updateTodo(newUpdateList));
    dispatch(
      ToastMessageAction({
        message: "Edit task successful !",
        severity: "success",
      })
    );
    handleOpenToast();
  } catch (err) {
    dispatch(
      ToastMessageAction({
        message: "WHOOPS! Something went wrong please try again ",
        severity: "warning",
      })
    );
    handleOpenToast();
    console.log(err);
  }
};

export const checkStatusApi = async (
  dispatch,
  dataEditStatus,
  todoList,
  id_user,
  id_list,
  id_todo,
  handleOpenToast
) => {
  try {
    const newUpdateStatusList = [...todoList].map((item) => {
      if (item.id === id_todo) {
        return dataEditStatus;
      }
      return item;
    });
    await updateDoc(doc(db, "users", id_user, "list", id_list), {
      todos: newUpdateStatusList,
    });

    dispatch(updateTodo(newUpdateStatusList));
  } catch (err) {
    dispatch(
      ToastMessageAction({
        message: "WHOOPS! Something went wrong please try again ",
        severity: "warning",
      })
    );
    handleOpenToast();
    console.log(err);
  }
};

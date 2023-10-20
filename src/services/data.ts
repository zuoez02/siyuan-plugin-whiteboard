export const getFilePath = (name) =>
  `/data/storage/petal/siyuan-plugin-whiteboard/${name}.whiteboard`;

export const libFilePath =
  "/data/storage/petal/siyuan-plugin-whiteboard/library.whiteboardlib";

export const saveLibraryFile = (json) => {
  const formData = new FormData();
  const pathString = libFilePath;
  let file;
  if (typeof json === "object") {
    file = new File(
      [
        new Blob([JSON.stringify(json)], {
          type: "application/json",
        }),
      ],
      pathString.split("/").pop()
    );
  } else {
    file = new File([new Blob([json])], pathString.split("/").pop());
  }
  formData.append("path", pathString);
  formData.append("file", file);
  formData.append("isDir", "false");
  fetch("/api/file/putFile", {
    method: "POST",
    body: formData,
  });
};

export const loadLibraryFile = async () => {
  const res = await fetch("/api/file/getFile", {
    method: "POST",
    body: JSON.stringify({ path: libFilePath }),
  });
  return await res.json();
};

export const saveData = (name, json) => {
  const formData = new FormData();
  const pathString = getFilePath(name);
  let file;
  if (typeof json === "object") {
    file = new File(
      [
        new Blob([JSON.stringify(json)], {
          type: "application/json",
        }),
      ],
      pathString.split("/").pop()
    );
  } else {
    file = new File([new Blob([json])], pathString.split("/").pop());
  }
  formData.append("path", pathString);
  formData.append("file", file);
  formData.append("isDir", "false");
  fetch("/api/file/putFile", {
    method: "POST",
    body: formData,
  });
};

export const deleteData = (name) => {
  return fetch("/api/file/removeFile", {
    method: "POST",
    body: JSON.stringify({ path: getFilePath(name) }),
  });
};

export const loadData = (name) => {
  return fetch("/api/file/getFile", {
    method: "POST",
    body: JSON.stringify({ path: getFilePath(name) }),
  }).then((res) => res.json());
};

export const loadAllFiles = () => {
  return fetch("/api/file/readDir", {
    method: "POST",
    body: JSON.stringify({
      path: "/data/storage/petal/siyuan-plugin-whiteboard",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return (data?.data || [])
        .filter((v) => v.name.endsWith(".whiteboard"))
        .map((v) => v.name.split(".")[0]);
    });
};

export function addWhiteboard(name) {
  saveData(name, {});
}

export function renameWhiteboard(name, newVal) {
  loadData(name).then((content) => {
    saveData(newVal, content);
    deleteData(name);
  });
}

export function deleteDraw(name) {
  deleteData(name);
}
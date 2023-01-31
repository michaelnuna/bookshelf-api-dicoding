const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const bookId = nanoid(16);
  insertedAt = new Date().toISOString();
  updateAt = insertedAt;

  const newBook = {
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updateAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.bookId === bookId).length > 0;
  if (name == "") {
    const respone = h.respone({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    respone.code(400);
    return respone;
  } else if (readPage > pageCount) {
    const respone = h.respone({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    respone.code(400);
    return respone;
  } else if (isSuccess) {
    const respone = h.respone({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: bookId,
      },
    });
    respone.code(201);
    return respone;
  } else {
    const respone = h.respone({
      status: "fail",
      message: "Buku gagal ditambahkan",
    });
    respone.code(500);
    return respone;
  }
};

const getAllBooksHandler = (request, h) => {
  const respone = h.respone({
    status: "success",
    data: {
      books,
    },
  });
  respone.code(200);
  return respone;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.bookId === bookId)[0];

  if (book !== undefined) {
    const respone = h.respone({
      status: "success",
      data: {
        book,
      },
    });
    respone.code(200);
    return respone;
  }
  const respone = h.respone({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  respone.code(404);
  return respone;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  updateAt = new Date().toISOString();

  const index = books.findIndex((book) => book.bookId === bookId);

  if (name == "") {
    const respone = h.respone({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    respone.code(400);
    return respone;
  } else if (readPage > pageCount) {
    const respone = h.respone({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    respone.code(400);
    return respone;
  } else if (index !== -1) {
    books[index] = {
      ...books[index],
      bookId,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updateAt,
    };
    const respone = h.respone({
      status: "success",
      message: "Buku berhasil diperbaharui",
    });
    respone.code(200);
    return respone;
  } else {
    const respone = h.respone({
      status: "fail",
      message: "Gagal memperbarui buku. BookId tidak ditemukan",
    });
    respone.code(404);
    return respone;
  }
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.bookId === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const respone = h.respone({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    respone.code(200);
    return respone;
  }

  const respone = h.respone({
    status: "fail",
    message: "Buku gagal dihapus. BookId tidak ditemukan",
  });
  respone.code(404);
  return respone;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};

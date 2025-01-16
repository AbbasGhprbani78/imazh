"use client";
import SearchBox from "@/components/module/SearchBox/SearchBox";
import TableUser from "@/components/module/Table/Table";
import React, { useEffect, useState } from "react";
import styles from "./Archive.module.css";
import axios from "axios";
import Toast from "@/components/module/Toast/Toast";
import Modal from "@/components/module/Modal/Modal";
import Button1 from "@/components/module/Buttons/Button1";
export default function Archive() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allArchives, setAllArchive] = useState([]);
  const [filteredArchives, setfilteredArchives] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [archiveId, setArchiveId] = useState("");
  const limit = 10;
  const [toastInfo, setToastInfo] = useState({
    type: "",
    title: "",
    message: "",
  });

  const searchHandler = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    setSearch(searchTerm);
    const filterArchives = allArchives.filter(
      (archive) =>
        archive.customer.fullname.includes(searchTerm) ||
        archive.customer.filenumber.includes(searchTerm) ||
        archive.customer.nationalcode.includes(searchTerm) ||
        archive.operation.operation.includes(searchTerm) ||
        archive.setting.name.includes(searchTerm) ||
        archive.customer.phonenumber.includes(searchTerm)
    );

    setfilteredArchives(filterArchives);
  };

  const fetchArchives = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/archive?page=${pageNumber}&limit=${limit}`
      );
      if (response.status === 200) {
        setAllArchive(response.data.data);
        setfilteredArchives(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("خطا در دریافت داده‌ها", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArchive = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/archive/${archiveId}`
      );
      if (response.status === 200) {
        setShowModal(false);
        fetchArchives(page);
        setToastInfo({
          type: "success",
          title: "حذف موفقیت آمیز",
          message: response?.data?.message,
        });
        setShowToast(true);
      }
    } catch (error) {
      setToastInfo({
        type: "error",
        title: "خطا در حذف",
        message:
          error.response?.data?.message || "مشکلی در سمت سرور رخ داده است",
      });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Modal
        title={"حذف آرشیو"}
        onClick={() => setShowModal(false)}
        showModal={showModal}
      >
        <p className={styles.text_model}>آیا از حذف آرشیو اطمینان دارید ؟</p>
        <div className={styles.wrap_btn_actions}>
          <Button1 text={"خیر"} Onclick={() => setShowModal(false)} />
          <Button1
            disable={loading}
            text={"بله"}
            Onclick={deleteArchive}
            style={{ background: "#535353" }}
            backstyle={"backstyle"}
          />
        </div>
      </Modal>
      <div className={`wrapper ${styles.container}`}>
        <div className={styles.top}>
          <span className={`title`}>آرشیو</span>
        </div>

        <SearchBox value={search} onChange={searchHandler} />
        {loading ? (
          <div className={`wrap_loading`}>
            <span className={`loading`}></span>
          </div>
        ) : (
          <TableUser
            archives={filteredArchives}
            totalPage={totalPages}
            handlePageChange={handlePageChange}
            page={page}
            setShowModal={setShowModal}
            setArchiveId={setArchiveId}
          />
        )}
      </div>
      <Toast
        type={toastInfo.type}
        title={toastInfo.title}
        message={toastInfo.message}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
}

{
  /* <div className={styles.wrapper_actions}>
            <Button2 icon={LocalPrintshopIcon} />
          </div> */
}

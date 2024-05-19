import { useEffect, useState } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../components/navBar";
import { RootState } from "../store";
import apis from "../store/apis";
import { ArrowLeft, ArrowRight } from "../components/icons";
import CustomModal from "../hoc/modal";
import OrderComponent from "../components/orders";

const Home = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    {} as Product
  );
  const [pageSetting, setPageSetting] = useState<PaginationDTO>({
    page: 1,
    pageSize: 5,
    category: undefined,
  });

  const { data, loading } = useSelector((state: RootState) => state.products);
  const { success } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(apis.allProducts(pageSetting) as unknown as UnknownAction);
  }, [dispatch, pageSetting, success]);

  const handleRowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSetting((setting) => ({
      ...setting,
      pageSize: Number(e.target.value),
    }));
  };

  const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSetting((setting) => ({ ...setting, category: +e.target.value }));
  };

  return (
    <>
      <div className="main">
        <NavBar />
        <div className="head">
          <div>
            <select onChange={handleSelectCategory} name="Categories">
              <option>All categories</option>
              <option value={1}>Seeds</option>
              <option value={2}>Fertilizers</option>
            </select>
            <select name="Rows" onChange={handleRowChange}>
              <option selected={pageSetting.pageSize === 5} value="5">
                Number of rows: {5}
              </option>
              <option selected={pageSetting.pageSize === 10} value="10">
                Number of rows: {10}
              </option>
              <option selected={pageSetting.pageSize === 15} value="15">
                Number of rows: {15}
              </option>
            </select>
          </div>
          <div>
            <h3 className="">{loading ? "Loading..." : "AvailableProducts"}</h3>
            <div className="count">{loading ? "..." : data.count}</div>
          </div>
        </div>
        <div className="product_list">
          {data.content.map((item) => (
            <div
              key={item.id}
              className="product_item"
              onClick={() => {
                setVisible(true);
                setSelectedProduct(item);
              }}
            >
              <div
                className="product_avatar"
                style={{
                  backgroundImage: `url(${item.picture})`,
                }}
              ></div>
              <div className="description">
                <h6 className="item_name">{item.name}</h6>
                <h5 className="item_price">{item.price} Rwf</h5>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() =>
              setPageSetting((setting) => ({
                ...setting,
                page: setting.page--,
              }))
            }
            disabled={pageSetting.page === 1}
            className="page_selector"
          >
            <ArrowLeft />
          </button>
          <div className="pages">
            {[...new Array(data.pages)].map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setPageSetting((setting) => ({ ...setting, page: index + 1 }))
                }
                aria-disabled={pageSetting.page === index + 1}
                disabled={pageSetting.page === index + 1}
                className={
                  pageSetting.page === index + 1 ? "selected_page" : ""
                }
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setPageSetting((setting) => ({
                ...setting,
                page: setting.page++,
              }))
            }
            disabled={pageSetting.page === data.pages}
            className="page_selector"
          >
            <ArrowRight />
          </button>
        </div>
        <CustomModal visible={visible} setVisible={() => setVisible(false)}>
          <OrderComponent item={selectedProduct} />
        </CustomModal>
      </div>
    </>
  );
};

export default Home;

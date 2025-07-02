import { notifyError, notifySuccess } from "../../helper/helpers";
import { auction } from "../config/urlConfig";

export const getSingleAuction = (id) => async (dispatch) => {
  dispatch({ type: "SINGLE_AUCTION_FETCHING" });
  try {
    const { data } = await auction.get(
      `/auction/read/admin/single-auction/${id}`
    );
    dispatch({ type: "SINGLE_AUCTION_SUCCESS", payload: data });
  } catch (error) {
    notifyError(
      error.response ? error.response?.data : error.message,
      error.response?.status
    );
    dispatch({ type: "CANNOT_SINGLE_AUCTION" });
  }
};

export const createAuction =
  (id, createAuctionObj, setAuctionDetails, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_AUCTION_FETCHING" });
    try {
      const { data } = await auction.post(
        `/auction/create/new/${id}`,
        createAuctionObj
      );
      dispatch({ type: "CREATE_AUCTION_SUCCESS", payload: data });
      notifySuccess("Auction created successfully");
      setAuctionDetails({
        EMDSchedule: { lastDate: "", lastTime: "" },
        inspectionSchedule: {
          endDate: "",
          inspectionLocation: "",
          startingTime: "",
          endingTime: "",
        },
        auctionSchedule: {
          startDate: "",
          startingTime: "",
          endingTime: "",
        },
        auctionType: "forwardAuction",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
      });
      navigate(`/create-auction-lots/forward/${data?._id}`);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CANNOT_CREATE_AUCTION" });
    }
  };

export const createServiceReverseAuction =
  (id, createAuctionObj, setAuctionDetails, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_AUCTION_FETCHING" });
    try {
      const { data } = await auction.post(
        `/reverse-auction/create/revers-service-auction/${id}`,
        createAuctionObj
      );
      dispatch({ type: "CREATE_AUCTION_SUCCESS", payload: data });
      notifySuccess("Service reverse auction created successfully");
      setAuctionDetails({
        EMDSchedule: { lastDate: "", lastTime: "" },
        auctionSchedule: {
          startDate: "",
          startingTime: "",
          endingTime: "",
        },
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        auctionType: "reverseAuctionService",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
        auctionRegion: "",
        auctionMode: "",
        description: "",
         serviceName: ""
      });
      navigate(`/reverseAuction/service/create-auction-lots/${data?._id}`);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CANNOT_CREATE_AUCTION" });
    }
  };

export const updateServiceReverseAuction =
  (id, createAuctionObj, setAuctionDetails, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_AUCTION_FETCHING" });
    try {
      const { data } = await auction.put(
        `/reverse-auction/update/admin/update-single-auction/${id}`,
        createAuctionObj
      );
      dispatch({ type: "CREATE_AUCTION_SUCCESS", payload: data });
      notifySuccess("Service reverse auction update successfully");
      setAuctionDetails({
        EMDSchedule: { lastDate: "", lastTime: "" },
        auctionSchedule: {
          startDate: "",
          startingTime: "",
          endingTime: "",
        },
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        auctionType: "reverseAuctionService",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
        auctionRegion: "",
        auctionMode: "",
        description: "",
         serviceName: ""
      });
      navigate(-1);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CANNOT_CREATE_AUCTION" });
    }
  };

export const createProductReverseAuction =
  (id, createAuctionObj, setAuctionDetails, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_AUCTION_FETCHING" });
    try {
      const { data } = await auction.post(
        `/reverse-auction/create/revers-product-auction/${id}`,
        createAuctionObj
      );
      dispatch({ type: "CREATE_AUCTION_SUCCESS", payload: data });
      notifySuccess("Product reverse auction created successfully");
      setAuctionDetails({
        EMDSchedule: { lastDate: "", lastTime: "" },
        auctionSchedule: {
          startDate: "",
          startingTime: "",
          endingTime: "",
        },
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        auctionType: "reverseAuctionProduct",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
        auctionRegion: "",
        auctionMode: "",
        description: "",
      });
      navigate(`/reverseAuction/product/create-auction-lots/${data?._id}`);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CANNOT_CREATE_AUCTION" });
    }
  };

export const updateProductReverseAuction =
  (id, uodateAuctionObj, setUpdateAuction, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_AUCTION_FETCHING" });
    try {
      const { data } = await auction.put(
        `/reverse-auction/update/admin/update-single-auction/${id}`,
        uodateAuctionObj
      );
      dispatch({ type: "CREATE_AUCTION_SUCCESS", payload: data });
      notifySuccess("Product reverse auction created successfully");
      setUpdateAuction({
        EMDSchedule: { lastDate: "", lastTime: "" },
        auctionSchedule: {
          startDate: "",
          startingTime: "",
          endingTime: "",
        },
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        auctionType: "reverseAuctionProduct",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
        auctionRegion: "",
        auctionMode: "",
        description: "",
      });
      navigate(-1);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CANNOT_CREATE_AUCTION" });
    }
  };
export const updateAuctionDetails =
  (id, createAuctionObj, setAuctionDetails, navigate) => async (dispatch) => {
    dispatch({ type: "CREATE_AUCTION_FETCHING" });
    try {
      const { data } = await auction.put(
        `/auction/update/admin/update-single-auction/${id}`,
        createAuctionObj
      );
      dispatch({ type: "CREATE_AUCTION_SUCCESS", payload: data });
      notifySuccess("Auction update successfully");
      setAuctionDetails({
        EMDSchedule: { lastDate: "", lastTime: "" },
        inspectionSchedule: {
          endDate: "",
          inspectionLocation: "",
          startingTime: "",
          endingTime: "",
        },
        auctionSchedule: {
          startDate: "",
          startingTime: "",
          endingTime: "",
        },
        auctionType: "forwardAuction",
        auctionCoordinators: [],
        contractValidity: "",
        bidValidity: "",
      });
      navigate(-1);
    } catch (error) {
      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
      dispatch({ type: "CANNOT_CREATE_AUCTION" });
    }
  };

export const offerCreate =
  (id, object, imageFileList, setKeyValue, setImageFileList, setCreateOffer) =>
    async (dispatch) => {
      const formDatas = new FormData();

      const data = [
        { key: "quantity", value: String(object?.quantity) },
        {
          key: "location",
          value: JSON.stringify(object?.location),
        },
        { key: "EMDAmount", value: String(object?.EMDAmount) },
        { key: "eventFee", value: String(object?.eventFee) },
        {
          key: "scrapDetails",
          value: JSON.stringify({
            type: object?.productType,
            quantity: object?.quantity,
            unit: object?.unit,
          }),
        },
        { key: "minimumBidDecrease", value: String(object?.minimumBidDecrease || 0) },
        { key: "minimumBid", value: String(object?.minimumBid || 0) },
        { key: "liftingPeriod", value: String(object?.liftingPeriod) },
        { key: "ItTCSTaxes", value: String(object?.ItTCSTaxes) },
        { key: "GSTTaxes", value: String(object?.GSTTaxes) },
        {
          key: "offerSchedule",
          value: JSON.stringify({
            startingTime: object?.offerStartTime,
            endingTime: object?.offerEndTime,
          }),
        },
        { key: "requiresPCBCertificate", value: JSON.stringify(object?.checked) },
      ];

      data.forEach((item) => formDatas.append(item.key, item.value));

      if (imageFileList?.length > 0) {
        imageFileList?.forEach((item, index) => {
          formDatas.append(`photo${index + 1}`, item);
        });
      }

      if (object?.description !== "") {
        formDatas.append("description", object?.description);
      }
      dispatch({ type: "CREATE_AUCTION_FETCHING" });
      try {
        const { data } = await auction.post(
          `/auction/create/new-offer/${id}`,
          formDatas
        );
        dispatch({ type: "CREATE_OBJECT_SUCCESS", payload: data });
        setKeyValue(Math.floor(Math.random() * 100));
        notifySuccess("Created Lots Successfully");
        dispatch(getSingleAuction(id));
        setImageFileList([]);
        setCreateOffer({
          EMDAmount: null,
          quantity: null,
          minimumBid: null,
          minimumBidDecrease: null,
          description: "",
          unit: "MT",
          checked: false,
          location: "",
          offerStartTime: "",
          offerEndTime: "",
          productType: "",
          liftingPeriod: "",
          ItTCSTaxes: "1",
          GSTTaxes: "18",
          eventFee: null,
        });
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_CREATE_AUCTION" });
      }
    };

export const createReverseServiceOffer =
  (id, object, imageFileList, setKeyValue, setImageFileList, setCreateOffer) =>
    async (dispatch) => {
      const formDatas = new FormData();
      const data = [
        {
          key: "location",
          value: String(object?.location),
        },
        { key: "EMDAmount", value: String(object?.EMDAmount) },
        { key: "eventFee", value: String(object?.eventFee) },
        { key: "minimumBidDecrease", value: String(object?.minimumBidDecrease) },
        { key: "ItTCSTaxes", value: String(object?.ItTCSTaxes) },
        { key: "GSTTaxes", value: String(object?.GSTTaxes) },
        {
          key: "offerSchedule",
          value: JSON.stringify({
            startingTime: object?.offerStartTime,
            endingTime: object?.offerEndTime,
          }),
        },
        {
          key: "serviceDetails",
          value: JSON.stringify({
            title: object?.title,
            quantity: object?.quantity,
            category: object?.category,
            subCategory: object?.subCategory,
            requirements: object?.requirements,
            unit: object?.unit,
          }),
        },
      ];
      data.forEach((item) => formDatas.append(item.key, item.value));

      if (imageFileList?.length > 0) {
        imageFileList?.forEach((item, index) => {
          formDatas.append(`photo${index + 1}`, item);
        });
      }

      if (object?.description !== "") {
        formDatas.append("description", object?.description);
      }

      dispatch({ type: "CREATE_AUCTION_FETCHING" });
      try {
        const { data } = await auction.post(
          `/reverse-auction/create/new-revers-service-offer/${id}`,
          formDatas
        );
        dispatch({ type: "CREATE_OBJECT_SUCCESS", payload: data });
        setKeyValue(Math.floor(Math.random() * 100));
        notifySuccess("Reverse Service lot Created Successfully");
        dispatch(getSingleAuction(id));
        setImageFileList([]);
        setCreateOffer({
          EMDAmount: null,
          minimumBidDecrease: null,
          description: "",
          location: "",
          offerStartTime: "",
          offerEndTime: "",
          ItTCSTaxes: "1",
          GSTTaxes: "18",
          eventFee: null,
          title: "",
          quantity: null,
          category: "",
          subCategory: "",
          requirements: [],
          unit: "MT",
        });
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_CREATE_AUCTION" });
      }
    };

export const updateReverseServiceOffer =
  (
    id,
    offerId,
    object,
    imageFileList,
    setKeyValue,
    setImageFileList,
    setCreateOffer,
    navigate
  ) =>
    async (dispatch) => {
      const updateStructure = {
        location: object?.location,
        EMDAmount: object?.EMDAmount,
        eventFee: object?.eventFee,
        minimumBidDecrease: object?.minimumBidDecrease,
        ItTCSTaxes: object?.ItTCSTaxes,
        GSTTaxes: object?.GSTTaxes,
        serviceDetails: {
          title: object?.title,
          quantity: object?.quantity,
          category: object?.category,
          subCategory: object?.subCategory,
          requirements: object?.requirements,
          unit: object?.unit,
        },
        description: object?.description,
      };
      console.log("updateStructure", updateStructure);
      dispatch({ type: "CREATE_AUCTION_FETCHING" });
      try {
        const { data } = await auction.put(
          `/reverse-auction/update/admin/single-service-offer/${id}/${offerId}`,
          updateStructure
        );
        await auction.put(
          `/auction/update/admin/single-offer-time/${id}/${offerId}`,
          {
            startingTime: object?.offerStartTime,
            endingTime: object?.offerEndTime,
          }
        );
        dispatch({ type: "CREATE_OBJECT_SUCCESS", payload: data });
        setKeyValue(Math.floor(Math.random() * 100));
        notifySuccess("Reverse Service lot Created Successfully");
        navigate(-1)
        setImageFileList([]);
        setCreateOffer({
          EMDAmount: null,
          minimumBidDecrease: null,
          description: "",
          location: "",
          offerStartTime: "",
          offerEndTime: "",
          ItTCSTaxes: "1",
          GSTTaxes: "18",
          eventFee: null,
          title: "",
          quantity: null,
          category: "",
          subCategory: "",
          requirements: [],
          unit: "MT"
        });
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_CREATE_AUCTION" });
      }
    };

export const createReverseProductOffer =
  (id, object, imageFileList, setKeyValue, setImageFileList, setCreateOffer) =>
    async (dispatch) => {
      const formDatas = new FormData();

      const data = [
        { key: "quantity", value: String(object?.quantity) },
        {
          key: "location",
          value: JSON.stringify(object?.location),
        },
        { key: "EMDAmount", value: String(object?.EMDAmount) },
        { key: "eventFee", value: String(object?.eventFee) },
        {
          key: "productDetails",
          value: JSON.stringify({
            type: object?.productType,
            quantity: object?.quantity,
            unit: object?.unit,
          }),
        },
        { key: "minimumBidDecrease", value: String(object?.minimumBidDecrease) },
        { key: "ItTCSTaxes", value: String(object?.ItTCSTaxes) },
        { key: "GSTTaxes", value: String(object?.GSTTaxes) },
        {
          key: "offerSchedule",
          value: JSON.stringify({
            startingTime: object?.offerStartTime,
            endingTime: object?.offerEndTime,
          }),
        },
        { key: "requiresPCBCertificate", value: JSON.stringify(object?.checked) },
      ];

      data.forEach((item) => formDatas.append(item.key, item.value));

      if (imageFileList?.length > 0) {
        imageFileList?.forEach((item, index) => {
          formDatas.append(`photo${index + 1}`, item);
        });
      }

      if (object?.description !== "") {
        formDatas.append("description", object?.description);
      }
      dispatch({ type: "CREATE_AUCTION_FETCHING" });
      try {
        const { data } = await auction.post(
          `/reverse-auction/create/new-revers-product-offer/${id}`,
          formDatas
        );
        dispatch({ type: "CREATE_OBJECT_SUCCESS", payload: data });
        setKeyValue(Math.floor(Math.random() * 100));
        notifySuccess("Product reverse lot Created Successfully");
        dispatch(getSingleAuction(id));
        setImageFileList([]);
        setCreateOffer({
          EMDAmount: null,
          quantity: null,
          minimumBidDecrease: null,
          description: "",
          unit: "MT",
          checked: false,
          location: "",
          offerStartTime: "",
          offerEndTime: "",
          productType: "",
          ItTCSTaxes: "1",
          GSTTaxes: "18",
          eventFee: null,
        });
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_CREATE_AUCTION" });
      }
    };

export const updateReverseProductOffer =
  (
    id,
    offerId,
    object,
    imageFileList,
    setKeyValue,
    setImageFileList,
    setCreateOffer,
    navigate
  ) =>
    async (dispatch) => {
      const updateStructure = {
        location: object?.location,
        EMDAmount: object?.EMDAmount,
        eventFee: object?.eventFee,
        minimumBidDecrease: object?.minimumBidDecrease,
        ItTCSTaxes: object?.ItTCSTaxes,
        GSTTaxes: object?.GSTTaxes,
        productDetails: {
          type: object?.productType,
          quantity: object?.quantity,
          unit: object?.unit,
        },
        description: object?.description,
        requiresPCBCertificate: object?.checked,
      }

      dispatch({ type: "CREATE_AUCTION_FETCHING" });
      try {
        const { data } = await auction.put(
          `/reverse-auction/update/admin/single-product-offer/${id}/${offerId}`,
          updateStructure
        );
        await auction.put(
          `/auction/update/admin/single-offer-time/${id}/${offerId}`,
          {
            startingTime: object?.offerStartTime,
            endingTime: object?.offerEndTime,
          }
        );
        dispatch({ type: "CREATE_OBJECT_SUCCESS", payload: data });
        setKeyValue(Math.floor(Math.random() * 100));
        notifySuccess("Product reverse lot Created Successfully");
        navigate(-1);
        setImageFileList([]);
        setCreateOffer({
          EMDAmount: null,
          quantity: null,
          minimumBidDecrease: null,
          description: "",
          unit: "MT",
          checked: false,
          location: "",
          offerStartTime: "",
          offerEndTime: "",
          productType: "",
          ItTCSTaxes: "1",
          GSTTaxes: "18",
          eventFee: null,
        });
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_CREATE_AUCTION" });
      }
    };

export const rescheduleAuction =
  (id, industryID, rescheduleObj, setAuctionDetails, navigate) =>
    async (dispatch) => {
      dispatch({ type: "RESCHEDULE_AUCTION_FETCHING" });

      try {
        const { data } = await auction.post(
          `/auction/create/reschadule-auction/${industryID}/${id}`,
          rescheduleObj
        );
        dispatch({ type: "RESCHEDULE_AUCTION_SUCCESS", payload: data });
        notifySuccess("Auction Rescheduled Successfully");
        setAuctionDetails({
          EMDSchedule: { lastDate: "", lastTime: "" },
          inspectionSchedule: {
            endDate: "",
            inspectionLocation: "",
            startingTime: "",
            endingTime: "",
          },
          auctionSchedule: {
            startDate: "",
            startingTime: "",
            endingTime: "",
          },
          auctionType: "forwardAuction",
          auctionCoordinators: [],
          contractValidity: "",
          bidValidity: "",
          offers: [],
        });
        navigate(`/`);
      } catch (error) {
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_RESCHEDULE_AUCTION" });
      }
    };

export const adminPayEMD =
  (auctionId, emdDetails, setSubmitLoading, navigate) => async (dispatch) => {
    setSubmitLoading(true);
    try {
      const { data } = await auction.put(
        `/auction/update/admin/pay-deposit/${auctionId}`,
        emdDetails
      );
      notifySuccess(data);
      setSubmitLoading(false);
      navigate(-1);
    } catch (error) {
      setSubmitLoading(false);

      notifyError(
        error.response ? error.response?.data : error.message,
        error.response?.status
      );
    }
  };

export const updateLotInformation =
  (auctionId, offerId, object, setKeyValue, setCreateOffer, navigate) =>
    async (dispatch) => {
      const { startingTime, endingTime, ...restOfferData } = object;
      dispatch({ type: "CREATE_AUCTION_FETCHING" });
      try {
        await auction.put(
          `/auction/update/admin/single-offer-time/${auctionId}/${offerId}`,
          { startingTime, endingTime }
        );

        const { data } = await auction.put(
          `/auction/update/admin/single-offer/${auctionId}/${offerId}`,
          restOfferData
        );

        dispatch({ type: "CREATE_OBJECT_SUCCESS", payload: data });
        setKeyValue(Math.floor(Math.random() * 100));
        notifySuccess("Update Lots Successfully");
        navigate(-1);
        setCreateOffer({
          EMDAmount: null,
          quantity: null,
          minimumBid: null,
          minimumBidDecrease: null,
          description: "",
          unit: "MT",
          checked: false,
          location: "",
          offerStartTime: "",
          offerEndTime: "",
          productType: "",
          liftingPeriod: "",
          ItTCSTaxes: "1",
          GSTTaxes: "18",
        });
      } catch (error) {
        setKeyValue(Math.floor(Math.random() * 100));
        notifyError(
          error.response ? error.response?.data : error.message,
          error.response?.status
        );
        dispatch({ type: "CANNOT_CREATE_AUCTION" });
      }
    };

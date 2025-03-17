import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
} from "antd";
import {
  callCreateAUser,
  callCreateCustomer,
  callCreateEmployee,
  callFetchBookById,
  callFetchPermissionById,
  callFetchPermissionByName,
  callListRole,
} from "../../../services/api";

const ModalAddPermission = (props) => {
  const {
    openModalAddPermission,
    setModalAddPermission,
    listPermissions,
    products,
    setProducts,
    permissionDataUpdate,
  } = props;
  const [form] = Form.useForm();

  // Lọc danh sách quyền để loại bỏ các quyền đã có trong role
  const filteredPermissions = listPermissions.filter((permission) => {
    // Kiểm tra xem permission này đã tồn tại trong permissionDataUpdate chưa
    return !permissionDataUpdate?.some(
      (existingPerm) => existingPerm.name === permission.value
    );
  });

  const onFinish = async (values) => {
    const { permission } = values;
    const res = await callFetchPermissionByName(permission);
    console.log("res", res);
    if (res && res.data) {
      const { id, name, apiPath, method, module } = res.data;
      const pr = { id, name, apiPath, method, module };
      setProducts([...products, { ...pr, key: Date.now() }]);
      setModalAddPermission(false);
    }
    form.resetFields();
  };

  return (
    <>
      {/* Modal thêm sản phẩm */}
      <Modal
        title="Thêm permission vào role"
        open={openModalAddPermission}
        onCancel={() => {
          setModalAddPermission(false);
          form.resetFields();
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          form={form}
          name="add_permission_form"
          onFinish={onFinish}
        >
          <Form.Item
            label="Tên quyền"
            name="permission"
            rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
          >
            <Select
              defaultValue={null}
              showSearch
              allowClear
              options={filteredPermissions}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddPermission;

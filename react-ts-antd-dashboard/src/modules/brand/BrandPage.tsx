import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrand, deleteBrand, fetchBrands, updateBrand } from "./brand.service";
import { Button, Card, Modal, Pagination, Space, Table, type TableProps, Form, Input, Popconfirm } from "antd";
import type { IBrand, IBrandDTO, IBrandResponse } from "./brand.type";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { useAppMessage } from "../../stores/useAppMessage";

const BrandPage = () => {
    const navigate = useNavigate()
    const {sendMessage} = useAppMessage()
    const queryClient = useQueryClient()

   

  /** -----// BEGIN GET BRANDS    //------------ */
   const [params] = useSearchParams();
    const page = params.get("page");
    const limit = params.get("limit");
    const initPage = page ? Number(page) : 1;
    const initLimit = limit ? Number(limit) : 2;

    console.log('<<=== 🚀 page,limit ===>>',page,limit);

  const queryBrands = useQuery<IBrandResponse>({
    queryKey: ["brands", initPage, initLimit],
    queryFn: ()=>fetchBrands({page: initPage, limit: initLimit}),
  });
 

  /** -----// END GET BRANDS    //------------ */

   /** -----// BEGIN ADD BRAND    //------------ */
  const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
  const [formAdd] = Form.useForm();

    const showModalAdd = () => {
        setIsModalAddOpen(true);
    };


  const handleOkAdd = async () => {
    //submit Form add
    formAdd.submit();
  };

  const handleCancelAdd = () => {
    //formAdd.resetFields();
    setIsModalAddOpen(false);
  };

  const mutationCreateBrand = useMutation({
    mutationFn: createBrand,
    onSuccess: ()=>{
        //tắt modal
        setIsModalAddOpen(false);
        //reset forms
        formAdd.resetFields();
        //làm tươi lại danh sách
         queryClient.invalidateQueries({ queryKey: ["brands", initPage, initLimit] })
        //Thông báo thêm mới thành công
        console.log('Thêm mới thành công');
        sendMessage({
            msg: 'Thêm mới thành công',
            type: 'success'
        });
    },
    onError: (error)=>{
        console.log('<<=== 🚀 error ===>>',error);
         sendMessage({
            msg: 'Thêm mới thất bại',
            type: 'error'
        });
    }
  })

  const onHandleFinishAddBrand = async (values: IBrandDTO)=>{
    console.log('<<=== 🚀 values ===>>',values);
    //Gọi API
   await mutationCreateBrand.mutateAsync(values);
  }
   /** -----// END ADD BRAND    //------------ */


   /** -----// BEGIN UPDATE BRAND    //------------ */
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [formUpdate] = Form.useForm();

    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);
    };


  const handleOkUpdate = async () => {
    //submit Form update
    formUpdate.submit();
  };

  const handleCancelUpdate = () => {
    //formUpdate.resetFields();
    setIsModalUpdateOpen(false);
  };

  const mutationUpdateBrand = useMutation({
    mutationFn: updateBrand,
    onSuccess: ()=>{
        //tắt modal
        setIsModalUpdateOpen(false);
        //reset forms
        formUpdate.resetFields();
        //làm tươi lại danh sách
         queryClient.invalidateQueries({ queryKey: ["brands", initPage, initLimit] })
        //Thông báo cập nhật thành công
        console.log('Cập nhật thành công');
        sendMessage({
            msg: 'Cập nhật thành công',
            type: 'success'
        });
    },
    onError: (error)=>{
        console.log('<<=== 🚀 error ===>>',error);
         sendMessage({
            msg: 'Thêm mới thất bại',
            type: 'error'
        });
    }
  })

  const onHandleFinishUpdateBrand = async (values: IBrandDTO & { id: number })=>{
    console.log('<<=== 🚀 values ===>>',values);
    //Gọi API
   await mutationUpdateBrand.mutateAsync(values);
  }
   /** -----// END UPDATE BRAND    //------------ */


    /** -----// BEGIN DELETE BRAND    //------------ */
    const deleteMutationBrand = useMutation({
        mutationFn: deleteBrand,
        onSuccess: ()=>{
            //Thông báo xóa thành công
            console.log('Xóa thành công');
             //làm tươi lại danh sách
             queryClient.invalidateQueries({ queryKey: ["brands", initPage, initLimit] })
            sendMessage({
                msg: 'Xóa thành công',
                type: 'success'
            });
        },
        onError: (error)=>{
            console.log('<<=== 🚀 error ===>>',error);
            sendMessage({
                msg: 'Xóa thất bại',
                type: 'error'
            });
        }
    })

     /** -----// BEGIN DELETE BRAND    //------------ */

    const columns: TableProps<IBrand>["columns"] = [
    {
      title: "Name",
      dataIndex: "brand_name",
      key: "brand_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type='dashed' onClick={()=>{
            //Lấy dữ liệu đổ vào form Update
            formUpdate.setFieldsValue(record);
            showModalUpdate();
          }}>Edit</Button>
          
          <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={async()=>{
        console.log('ok xoa');
        await deleteMutationBrand.mutateAsync(record.id)
    }}
    okText="Yes"
    cancelText="No"
  >
   <Button   danger type='dashed'>Delete</Button>
  </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
        <Card title="Brands List" extra={<Button type='primary' onClick={()=>{
            console.log('add brand');
            showModalAdd();
        }}>Thêm Mới Brand</Button>} >
      <Table<IBrand>
        loading={queryBrands.isLoading}
        pagination={false}
        columns={columns}
        dataSource={queryBrands?.data?.data.data || []}
      />
      <div style={{ marginTop: 20 }}>
        <Pagination
          defaultCurrent={1}
          pageSize={2}
          total={queryBrands?.data?.data?.totalRecords || 0}
          onChange={(page, pageSize)=>{
                navigate(`?page=${page}&limit=${pageSize}`)
          }}
        />
      </div>
    </Card>
      {/* MODAL ADD BRAND */}
      <Modal
        title="Add Brand"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalAddOpen}
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
      >
        <Form
          form={formAdd}
          layout="vertical"
          name="add-brand-form"
          onFinish={onHandleFinishAddBrand}
        >
          <Form.Item
            label="Brand Name"
            name="brand_name"
            rules={[{ required: true, message: 'Please input the brand name!' }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Please input the slug!' }]}
          >
            <Input placeholder="Enter slug" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
      {/* END MODAL ADD BRAND */}

       {/* MODAL UPDATE BRAND */}
      <Modal
        title="Update Brand"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalUpdateOpen}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
      >
        <Form
          form={formUpdate}
          layout="vertical"
          name="update-brand-form"
          onFinish={onHandleFinishUpdateBrand}
        >
          <Form.Item
            label="Brand Name"
            name="brand_name"
            rules={[{ required: true, message: 'Please input the brand name!' }]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>
          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: 'Please input the slug!' }]}
          >
            <Input placeholder="Enter slug" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>
         <Form.Item
         hidden
         name="id"
         >
             <Input hidden  />
         </Form.Item>

        </Form>
      </Modal>
      {/* END MODAL UPDATE BRAND */}
    </div>
  );
};

export default BrandPage;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Popconfirm, Table, Select } from 'antd';
import { Flex } from 'antd';


const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record ? record[dataIndex] : '',
    });
  };
    
  
    const handleEntryTypeChange = (value) => {
     
      if (value === 'API') {
        const newData = { ...record };

        newData['Energy Usage(KVAH)'] = '-na-';
        newData['Emission(kgCO2)'] = 'Calc...';
        handleSave(newData);
      }
    };
  
    const handleButtonClick = () => {
      console.log(`Values for row with key ${record.key}:`, record);
      
    };
const save = async () => {
  try {
    const values = await form.validateFields();
    toggleEdit();
    handleSave({
      ...record,
      ...values,
    });
  } catch (errInfo) {
    
  }
};

let childNode = children;

if (editable && dataIndex !== 'key') {
  childNode = editing ? (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `${title} is required.`,
        },
      ]}
    >
       {dataIndex === 'Entry Type' ? (
          <Select
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            onChange={handleEntryTypeChange}
          >
            <Option value="API">API</Option>
            <Option value="Manual">Manual</Option>
          </Select>
        ) : (
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }}>
        <span onClick={toggleEdit}>{children}</span>
        {dataIndex === 'EDIT' && (
          <SubmitButton record={record} onClick={handleButtonClick} />
        )}
      </div>
    );
  }

  return (
    <td {...restProps}>
      {childNode}
      {dataIndex === 'EDIT' && (
        <SubmitButton record={record} onClick={handleButtonClick} />
      )}
    </td>
  );
};



const SubmitButton = ({ record, onClick }) => (
  <Flex wrap="wrap" gap="small">
    <Button type="primary" onClick={onClick && (() => onClick(record))}>
      Submit
    </Button>
  </Flex>
);

const Electricity = () => {
  const handleButtonClick = (record) => {
    console.log(`Button clicked for row with key ${record.key}:`, record);
    
  };
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      
      'Energy Type': 'TNEB',
      'Entry Type': 'Manual',
      'Energy Usage(KVAH)': '8000',
      'Emission(kgCO2)': '18660',
      
      
    },
    {
      key: '1',
      
      'Energy Type': 'TNEB',
      'Entry Type': 'Manual',
      'Energy Usage(KVAH)': '8000',
      'Emission(kgCO2)': '12960',
    },
    {
      key: '2',
      
      'Energy Type': 'Nuclear',
      'Entry Type': 'Manual',
     'Energy Usage(KVAH)': '8000',
      'Emission(kgCO2)': '69660', 
    },
    {
        key: '3',
        
        'Energy Type': 'Solar',
        'Entry Type': 'Manual',
        'Energy Usage(KVAH)': '8000',
        'Emission(kgCO2)': '0',
      },
    
    
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    
    {
        title: 'Energy Type',
        dataIndex: 'Energy Type',
        width: '20%',
        editable: true,
      },
      {
        title: 'Entry Type',
        dataIndex: 'Entry Type',
        width: '12%',
        editable: true,
      },
      {
        title: 'Energy Usage(KVAH)',
        dataIndex: 'Energy Usage(KVAH)',
        width: '18%',
        editable: true,
      },
    {
      title: 'Emission(kgCO2)',
      dataIndex: 'Emission(kgCO2)',
      width: '18%',
      editable: true,
    },
    
    {
      title: 'EDIT',
      dataIndex: 'edit',
      render: (_, record) => <SubmitButton record={record} onClick={handleButtonClick} />,
    },
   
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count.toString(),
      'Energy Type': 'ㅤ',
      'Entry Type': '/Default',
      'Energy Usage(KVAH)': '-na-',
      'Emission(kgCO2)': '-na-',

      editable: true,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
  
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });


  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

export default Electricity;

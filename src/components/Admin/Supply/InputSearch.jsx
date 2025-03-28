import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, theme } from 'antd';
import { sfLike } from 'spring-filter-query-builder';
import { removeAccents } from '../../../utils/removeAccents';
import moment from 'moment';

const InputSearch = (props) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = (values) => {
        let query = "";
        let q = [];
        // build query
        if (values.bookId) {
            q.push(`book.id~'${values.bookId}'`);
        }

        if (values.supplierId) {
            q.push(`supplier.id~'${values.supplierId}'`);
        }


        // Join all query parts with ' and '
        query = `filter=${q.join(' and ')}`;
        const normalizedFilter = removeAccents(query);
        console.log('query:', query);
        if (normalizedFilter) {
            props.handleSearch(normalizedFilter);
        }

        //remove undefined
        // https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
        // Object.keys(values).forEach(key => {
        //     if (values[key] === undefined) {
        //         delete values[key];
        //     }
        // });

        // if (values && Object.keys(values).length > 0) {
        //     // https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
        //     const params = new URLSearchParams(values).toString();
        //     props.handleSearch(params);
        // }
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`bookId`}
                        label={`Mã sách`}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`supplierId`}
                        label={`Mã nhà cung cấp`}
                    >
                        <Input />
                    </Form.Item>
                </Col>



            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>

                </Col>
            </Row>
        </Form>
    );
};


export default InputSearch;

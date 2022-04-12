import type { NextPage } from 'next'
import React, { EventHandler, MouseEventHandler, useState } from 'react'
import checktableStyle from '../../styles/admin/checktable.module.css'


const CheckTable: NextPage<{ data: Array<any>, column: any, setCheckedList: Function, index: string }> = ({ data, column, setCheckedList, index }) => {
    function changeCheckedList(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        const element = event.currentTarget.value
        const isChecked = event.currentTarget.checked
        if (isChecked) {
            setCheckedList((value: Array<string>) => {
                value.push(element)
                console.log("value:", value)
                return value
            })
        } else {
            setCheckedList((value: Array<string>) => {
                value.splice(value.indexOf(element), 1)
                console.log("value:", value)
                return value
            })
        }
    }
    console.log(data)
    return (
        <div className={checktableStyle.content}>
            <h3 className={checktableStyle.title}>유저목록</h3>
            <table >
                <thead>
                    <tr>
                        {Object.keys(column).map((col: string) => <th scope="col">{col}</th>)}
                        <th scope="col">체크</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rows: any) =>
                        <tr>
                            {Object.values(column).map((col: string) => <td>{rows[col]}</td>)}
                            <td>
                                <input type="checkbox" onClick={changeCheckedList} value={rows[index]} />
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default CheckTable
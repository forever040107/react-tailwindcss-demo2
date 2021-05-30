import React, { useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import * as dayjs from "dayjs";

function LinkNoticeBoard() {
    const {
        data
    } = useSWR(
        "https://14bb7095-9ebd-403a-a384-a1029931ec5f.mock.pstmn.io/api/noticeboards",
        (url) => axios({ url })
    )

    const typeName = useMemo(
        () => ({
            1: "系統",
            2: "會員",
            3: "活動"
        }),
        []
    )

    return (
        <div className="bg-grey-50 h-screen">
            {data && data.data.map((item, index) => {
                return (
                    <div
                        className="flex flex-wrap w-full px-3 py-2 mt-2 bg-white"
                        key={index.toString()}
                    >
                        <div className="relative w-full">
                            <div className="flex mb-4 h-10 items-center">
                                <div
                                    className="flex-1 mr-3 text-title-8 font-bold leading-4 text-left overflow-hidden overflow-ellipsis"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: '2',
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    <div className="text-grey-500">
                                        {item.subject}
                                    </div>
                                </div>
                                <div
                                    className="max-h-6 bg-blue-200 box-border px-2 py-1 rounded text-body-6 text-white text-center whitespace-nowrap overflow-hidden"
                                    style={{ maxWidth: "72px" }}
                                >
                                    {typeName[item.typeID]}
                                </div>
                            </div>
                            <div className="mb-4 h-8 text-body-4 overflow-hidden">
                                <div className="text-grey-500">
                                    {item.textContent}
                                </div>
                            </div>
                            <div className="flex text-body-6">
                                <div className="w-1/2 text-platinum-200">
                                    {item.postBeginTime
                                        ? dayjs.unix(item.postBeginTime).format("YYYY/MM/DD mm:ss")
                                        : null}
                                </div>
                                <div className="w-1/2 text-right text-platinum-200 truncate overflow-hidden overflow-ellipsis">
                                    {item.announceDept}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default LinkNoticeBoard;

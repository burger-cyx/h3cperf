import { createBrowserRouter } from "react-router-dom";
import Main from "../pages";

import Dataset from "../pages/dataset";
import Model from "../pages/model";
import Train from "../pages/train";
import Infer from "../pages/infer";
import { Navigate } from "react-router-dom";
import InferTaskList from "../pages/infer/task/list";
import TrainTaskList from "../pages/train/task/list";
import InferTaskAdd from "../pages/infer/task/add";
import TrainTaskAdd from "../pages/train/task/add";
import InferReport from "../pages/infer/report";
import TrainReport from "../pages/train/report";
import Runtime from "../pages/runtime";




const routes = [
  {
    path: "/",
    Component: Main,
    children: [
        {
            path: "/",
            element: <Navigate to="model" replace />,
        },
        {
            path: "model",
            Component: Model
        },
        {
            path: "dataset",
            Component: Dataset
        },
        {
            path: "runtime",
            Component: Runtime
        },
        {
            path: "infer",
            Component: Infer,
        },
        {
            path: "train",
            Component: Train
        },
        {
            path: "task",
            children: [
                {
                    path: "infer/list",
                    Component: InferTaskList
                },
                {
                    path: "train/list",
                    Component: TrainTaskList
                },
                {
                    path: "infer/add",
                    Component: InferTaskAdd
                },
                {
                    path: "train/add",
                    Component: TrainTaskAdd
                }
            ]
        },
        {
            path: "report",
            children: [
                {
                    path: "infer/get",
                    Component: InferReport
                },
                {
                    path: "train/get",
                    Component: TrainReport
                }
            ]
        },
        

    ]   
  },
];

export default createBrowserRouter(routes);

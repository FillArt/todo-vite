import List from "@mui/material/List";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {Filter} from "@/app/App.tsx";
import {TaskItem} from "@/TaskItem.tsx";

type Props = {
    id: string,
    filter: Filter,
}

export const Tasks = ({id, filter}: Props) => {
    const tasks = useAppSelector(selectTasks)[id];
    let filteredTasks = tasks

    if(filter === 'active') {
        filteredTasks = tasks.filter(i => !i.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(i => i.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        return (
                            <TaskItem id={id} task={task} />
                        )
                    })}
                </List>
            )}
        </>
    );
};
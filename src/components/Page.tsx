import { useGlobalContext } from "~/GlobalContext/store"
import { Match, Show, Switch, createEffect, on, untrack } from "solid-js"
import Today from "~/pages/Today"
import Done from "~/pages/Done"
import All from "~/pages/All"
import Starred from "~/pages/Starred"
import ActionBar from "./ActionBar"
import { useKeyDownList } from "@solid-primitives/keyboard"
import LocalSearch from "./LocalSearch"

export default function Page() {
  const { activePage, setTodos, todos, focusedTodo, localSearch, editingTodo } =
    useGlobalContext()
  const [keys, { event }] = useKeyDownList()

  createEffect(() => {
    if (!editingTodo() && event()?.key === "Backspace") {
      untrack(() =>
        setTodos(todos().filter((todo) => todo.id !== focusedTodo()))
      )
    }
  })

  return (
    <div id="page" class="flex flex-col">
      <Switch>
        <Match when={activePage() === "All"}>
          <All />
        </Match>
        <Match when={activePage() === "Today"}>
          <Today />
        </Match>
        <Match when={activePage() === "Starred"}>
          <Starred />
        </Match>
        <Match when={activePage() === "Done"}>
          <Done />
        </Match>
      </Switch>
      <div
        class="flex fixed bottom-0 p-2 border-t border-opacity-25 border-slate-600 w-full"
        style={{ "margin-left": "-3px" }}
      >
        <Show when={localSearch()} fallback={<ActionBar />}>
          <LocalSearch />
        </Show>
      </div>
    </div>
  )
}

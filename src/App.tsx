import { useState } from 'react';
import { PlusCircle, Calendar, Tag, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  category: string;
  priority: string;
  dueDate: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      category,
      priority,
      dueDate,
    };

    setTodos([...todos, newTodo]);
    setInput('');
    setDueDate('');
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'low': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-purple-500 hover:bg-purple-600';
      case 'work': return 'bg-blue-500 hover:bg-blue-600';
      case 'shopping': return 'bg-pink-500 hover:bg-pink-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-8">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Minha Lista de Tarefas
        </h1>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Adicione uma nova tarefa..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
            />
            <Button onClick={handleAddTodo}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Adicionar
            </Button>
          </div>

          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Pessoal</SelectItem>
                <SelectItem value="work">Trabalho</SelectItem>
                <SelectItem value="shopping">Compras</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-[180px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center gap-2 p-4 rounded-lg transition-all",
                "bg-white shadow-sm hover:shadow-md",
                todo.completed && "opacity-60"
              )}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="w-5 h-5"
              />
              
              <span className={cn(
                "flex-1",
                todo.completed && "line-through text-gray-500"
              )}>
                {todo.text}
              </span>

              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(todo.category)}>
                  <Tag className="w-4 h-4 mr-1" />
                  {todo.category}
                </Badge>

                <Badge className={getPriorityColor(todo.priority)}>
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {todo.priority}
                </Badge>

                {todo.dueDate && (
                  <Badge variant="outline">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </Badge>
                )}

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default App;
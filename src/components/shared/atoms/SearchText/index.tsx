import { useEffect, useState } from "react";
import { Input } from "antd";
import { useDebounce } from "@hooks/use-debounce";
import { useMutateSearchParams } from "@hooks/use-mutate-search-params";
import { SearchIcon } from "lucide-react";
import clsx from "clsx";

const { Search } = Input;

interface SearchTextProps {
    placeholder?: string;
    className?: string;
    variant?: "default" | "sm";
}

export default function SearchText({ variant = "default", ...props }: SearchTextProps) {
    const { placeholder } = props;

    const { searchParams, mutateSearchParam } = useMutateSearchParams();
    const [searchText, setSearchText] = useState<string>(
        searchParams.get("search") || "",
    );
    const debouncedSearchText = useDebounce(searchText, 800);

    useEffect(() => {
        mutateSearchParam("search", debouncedSearchText);
    }, [debouncedSearchText, mutateSearchParam]);

    if (variant === "sm") {
        return (
            <div className={clsx("flex-grow min-w-[200px]", props.className)}>
                <p className="text-sm text-gray-500 mb-1">Buscar</p>
                <Input
                    placeholder={placeholder}
                    prefix={<SearchIcon className="h-4 w-4 text-gray-400" />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                />
            </div>
        );
    }

    return (
        <Search
            size="large"
            enterButton
            allowClear
            value={searchText}
            placeholder={placeholder}
            onSearch={(value) => {
                setSearchText(value);
            }}
            onChange={(e) => setSearchText(e.target.value)}
        />
    );
}

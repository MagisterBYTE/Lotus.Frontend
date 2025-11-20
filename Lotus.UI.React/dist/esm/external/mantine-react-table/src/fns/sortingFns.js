import { compareItems } from '@tanstack/match-sorter-utils';
import { sortingFns } from '@tanstack/react-table';
const fuzzy = (rowA, rowB, columnId) => {
    let dir = 0;
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(rowA.columnFiltersMeta[columnId], rowB.columnFiltersMeta[columnId]);
    }
    // Provide a fallback for when the item ranks are equal
    return dir === 0
        ? sortingFns.alphanumeric(rowA, rowB, columnId)
        : dir;
};
export const MRT_SortingFns = {
    ...sortingFns,
    fuzzy,
};
export const rankGlobalFuzzy = (rowA, rowB) => Math.max(...Object.values(rowB.columnFiltersMeta).map((v) => v.rank)) -
    Math.max(...Object.values(rowA.columnFiltersMeta).map((v) => v.rank));
//# sourceMappingURL=sortingFns.js.map
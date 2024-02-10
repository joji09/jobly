const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
    test("1 item", function () {
        const result = sqlForPartialUpdate(
            {f1: "u1"},
            {f1: "f1", fF2: "f2"}
        );
        expect(result).toEqual({
            setCols: "\"f1\"=$1",
            values: ["u1"],
        });
    });

    test("2 items", function () {
        const result = sqlForPartialUpdate(
            { f1: "u1", jsF2: "v2"},
            { jsF2: "f2"});
        expect(result).toEqual({
            setCols: "\"f1\"=$1, \"f2\"=$2",
            values: ["u1", "v2"]
        });
    });
});
/**
 * first we have to understand how unit tests are used.
 *
 * - Design aid:
 *   written during design phase, prior to implementation.
 *
 * - Feature documentation & test of developer understanding:
 *   The test should provide a clear description of the feature being tested.
 *
 * - QA/Continuous Delivery:
 *   The tests should halt the delivery pipeline on failure
 *   and produce a good bug report when they fail.
 *
 * What's in a good test failure bug report?
 *  1. What were you testing?
 *  2. What should it do?
 *  3. What was the output (actual behavior)?
 *  4. What was the expected output (expected behavior)?
 */

/**
 * # Section 0: The Golden Rule: Design for lean testing
 *
 * # Section 1: The Test Anatomy
 *
 * ## 1.1 Include 3 parts in each test name
 *  1. What is being tested?
 *  2. Under what circumstances and scenario?
 *  3. What is the expected result?
 *
 * ## 1.2 Structure tests by the AAA pattern
 *  1. Arrange
 *  2. Act
 *  3. Assert
 *
 * ## 1.3 Describe expectations in a product language: use BDD-style assertions
 *
 * ## 1.4 Stick to black-box testing: Test only public methods
 *
 * ## 1.5 Choose the right test doubles: Avoid mocks in favor of stubs and spies
 *
 * ## 1.6 Don't "foo", use realistic input data
 *
 * ## 1.7 Test many input combinations using Property-based testing
 *
 * ## 1.8 If needed, use only short & inline shapshots
 *
 * ## 1.9 Avoid global test fixtures and seeds, add data per-test
 *
 * ## 1.10 Don't catch errors, expect them
 *
 * ## 1.11 Tag your tests
 *
 * ## 1.12 Categorize tests under at least 2 levels
 *
 * ## 1.13 Other generic good testing hygiene
 */
import fc from "fast-check";
import { calculate } from "../logic";

/* What were you testing */
describe("function calculate", () => {
  /* What should it do? */
  describe("take list of operations, should return the result of operations", () => {
    /* Under what circumstances and scenario */
    describe("with empty operations, should return 0", () => {
      test("when given undefined, should return 0", () => {
        /* What was the output (actual / expected) */
        expect(calculate(undefined)).toBe(0);
      });

      test("when given empty list, should return 0", () => {
        expect(calculate([])).toBe(0);
      });
    });

    describe("with single operand", () => {
      test("given any integer x, should return x", () => {
        fc.assert(
          fc.property(fc.integer(), (x) => {
            expect(calculate([x])).toBe(x);
          })
        );
      });

      test("given any float x, should return x", () => {
        fc.assert(
          fc.property(fc.float(), (x) => {
            expect(calculate([x])).toBe(x);
          })
        );
      });

      test("given any operator x, should return 0", () => {
        fc.assert(
          fc.property(fc.constantFrom("+", "-", "*", "/"), (x) => {
            expect(calculate([x])).toBe(0);
          })
        );
      });

      test("given any x which is not operator nor operand, should throw '`operation x is not valid`'", () => {
        fc.assert(
          fc.property(
            fc.char().filter((x) => !["+", "-", "*", "/"].includes(x)),
            (x) => {
              expect(() => calculate([x])).toThrow(
                `operation ${x} is not valid`
              );
            }
          )
        );
      });
    });

    describe("given two operations", () => {
      describe("when first operation is operator and second is operand", () => {
        test("when operator is + , then given any operand x, should return x", () => {
          fc.assert(
            fc.property(fc.float(), (operand) => {
              expect(calculate(["+", operand])).toBe(operand);
            })
          );
        });

        test("when operator is - , then given any operand x exclude 0, should return (-1 * x)", () => {
          fc.assert(
            fc.property(
              fc.float().filter((x) => x !== 0),
              (operand) => {
                expect(calculate(["-", operand])).toBe(-operand);
              }
            )
          );
        });

        test("when operator is - , then given operand 0, should return 0", () => {
          expect(calculate(["-", 0])).toBe(0);
        });

        test("when operator is * , then given any operand x, should return 0", () => {
          fc.assert(
            fc.property(fc.float(), (operand) => {
              expect(calculate(["*", operand])).toBe(0);
            })
          );
        });

        test("when operator is / , then given any operand x exclude 0, should return 0", () => {
          fc.assert(
            fc.property(
              fc.float().filter((x) => x !== 0),
              (operand) => {
                expect(calculate(["/", operand])).toBe(0);
              }
            )
          );
        });

        test("when operator is / , then given operand 0, should return NaN", () => {
          expect(calculate(["/", 0])).toBe(NaN);
        });
      });

      describe("when first operation is operand and second is operator", () => {
        test("with any operand x, when operator is + , should return (x + x)", () => {
          fc.assert(
            fc.property(fc.float(), (operand) => {
              expect(calculate([operand, "+"])).toBe(operand + operand);
            })
          );
        });

        test("with any operand x, when operator is - , should return (x - x)", () => {
          fc.assert(
            fc.property(fc.float(), (operand) => {
              expect(calculate([operand, "-"])).toBe(operand - operand);
            })
          );
        });

        test("with any operand x, when operator is * , should return (x * x)", () => {
          fc.assert(
            fc.property(fc.float(), (operand) => {
              expect(calculate([operand, "*"])).toBe(operand * operand);
            })
          );
        });

        test("with any operand x exclude 0, when operator is / , should return (x / x)", () => {
          fc.assert(
            fc.property(
              fc.float().filter((x) => x !== 0),
              (operand) => {
                expect(calculate([operand, "/"])).toBe(operand / operand);
              }
            )
          );
        });

        test("with operand 0, when operator is / , should return NaN", () => {
          expect(calculate([0, "/"])).toBe(NaN);
        });
      });
    });

    describe("given three or above operations", () => {
      describe("given two operands x and y, which index are odd number", () => {
        test("given operator + , should return (x + y)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), (x, y) => {
              expect(calculate([x, "+", y])).toBe(x + y);
            })
          );
        });

        test("given operator - , should return (x - y)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), (x, y) => {
              expect(calculate([x, "-", y])).toBe(x - y);
            })
          );
        });

        test("given operator * , should return (x * y)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), (x, y) => {
              expect(calculate([x, "*", y])).toBe(x * y);
            })
          );
        });

        test("given operator / , should return (x / y)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), (x, y) => {
              expect(calculate([x, "/", y])).toBe(x / y);
            })
          );
        });
      });

      describe("given three operands x y z, which index are odd number", () => {
        test("given two operator + which index are even, should return (x + y + z)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), fc.float(), (x, y, z) => {
              expect(calculate([x, "+", y, "+", z])).toBe(x + y + z);
            })
          );
        });

        test("given two operator, first operator is *, second operator is +, should return (x * y + z)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), fc.float(), (x, y, z) => {
              expect(calculate([x, "*", y, "+", z])).toBe(x * y + z);
            })
          );
        });

        test("given two operator, first operator is +, second operator is *, should return (x + y * z)", () => {
          fc.assert(
            fc.property(fc.float(), fc.float(), fc.float(), (x, y, z) => {
              expect(calculate([x, "+", y, "*", z])).toBe(x + y * z);
            })
          );
        });
      });
    });
  });
});

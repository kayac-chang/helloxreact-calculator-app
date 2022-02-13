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

/* What were you testing */
describe("function calculate()", () => {
  /* What should it do? */
  describe(`should take list of operations, and return the result of operations`, () => {
    /* Under what circumstances and scenario */

    test.todo("given undefined, should return 0");
    /* What was the output (actual / expected) */
    // Arrange
    // Act
    // Assert
  });
});

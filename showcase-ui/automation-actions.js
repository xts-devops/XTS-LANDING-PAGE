(() => {
  const $ = (s) => document.querySelector(s);
  const write = (s, text) => {
    const node = $(s);
    if (node) node.textContent = text;
  };
  const click = (s, fn) => $(s)?.addEventListener('click', fn);
  if ($('[data-support-approve]')) {
    $('[data-support-approve]').disabled = true;
    click('[data-support-classify]', () => {
      write('[data-support-intent]', 'Order status · Fulfilment queue');
      write('[data-support-status]', 'Routed for review');
    });
    click('[data-support-draft]', () => {
      write(
        '[data-support-draft-text]',
        'Thanks for getting in touch. Order SAMPLE-1048 is prepared for dispatch. An agent can help if you need to update your delivery details.',
      );
      write('[data-support-status]', 'Draft ready · Review required');
      $('[data-support-approve]').disabled = false;
    });
    click('[data-support-approve]', () => {
      write('[data-support-status]', 'Sample reply queued');
      write(
        '[data-support-result]',
        'Reply approved in the sample workspace. No email or chat message was sent.',
      );
    });
    click('[data-support-handoff]', () => {
      write('[data-support-status]', 'Assigned to an agent');
      write(
        '[data-support-result]',
        'Sample handoff created with the conversation and order context attached.',
      );
    });
  }
  if ($('[data-doc-sync]')) {
    $('[data-doc-sync]').disabled = true;
    $('[data-doc-review]').disabled = true;
    click('[data-doc-index]', () => {
      write(
        '[data-doc-index-value]',
        'Invoice · Supplier correspondence · SAMPLE-0086',
      );
      write('[data-doc-status]', 'Indexed');
    });
    click('[data-doc-extract]', () => {
      write('[data-doc-supplier]', 'Sample materials supplier');
      write('[data-doc-reference]', 'SAMPLE-0086');
      write('[data-doc-total]', '₱9,000.00');
      write('[data-doc-status]', 'Fields extracted');
      write('[data-doc-review-value]', 'Needs human review');
      $('[data-doc-review]').disabled = false;
    });
    click('[data-doc-review]', () => {
      write('[data-doc-review-value]', 'Approved in sample workspace');
      write('[data-doc-status]', 'Approved');
      $('[data-doc-sync]').disabled = false;
    });
    click('[data-doc-sync]', () => {
      write('[data-doc-status]', 'Sample sync complete');
      $('[data-doc-status]').className = 'pill green';
      write(
        '[data-doc-result]',
        'Approved fields added to the sample ledger. No accounting API was contacted.',
      );
    });
  }
  if ($('[data-factory-sync]')) {
    $('[data-factory-sync]').disabled = true;
    const event = (text) => {
      const row = document.createElement('li'),
        stamp = document.createElement('span'),
        label = document.createElement('b');
      stamp.textContent = 'SAMPLE EVENT';
      label.textContent = text;
      row.append(stamp, label);
      $('[data-factory-events]').append(row);
      $('[data-factory-events]').scrollTop = $(
        '[data-factory-events]',
      ).scrollHeight;
    };
    click('[data-factory-read]', () => {
      write('[data-factory-sensor]', 'Signal received');
      write('[data-factory-controller]', 'Batch accepted');
      write('[data-factory-count]', '24 / 24 sample units');
      $('[data-factory-progress]').style.transform = 'scaleX(1)';
      write('[data-factory-status]', 'Batch ready');
      event('Sensor → edge controller: sample batch counted');
      $('[data-factory-sync]').disabled = false;
    });
    click('[data-factory-sync]', () => {
      write('[data-factory-connector]', 'Sample ERP sync complete');
      write('[data-factory-status]', 'Sample record synced');
      event('Edge gateway → ERP: batch record confirmed');
    });
    click('[data-factory-alert]', () => {
      write('[data-factory-status]', 'Sample exception flagged');
      $('[data-factory-status]').className = 'pill review';
      write(
        '[data-factory-result]',
        'A sample threshold alert was routed to the operations team. No equipment was controlled.',
      );
      event('Example exception → operations review queue');
    });
  }
})();
